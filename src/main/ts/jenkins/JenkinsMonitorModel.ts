/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../vendor/knockout.d.ts" />
/// <reference path="../vendor/moment.d.ts" />
import ko = require('knockout');
import moment = require('moment');
import Types = require('../util/Types');
import MonitorModel = require('../monitorModel/MonitorModel');
import MonitorModels = require('../monitorModel/MonitorModels');
import Connector = require('../connector/Connector');
import CssClasses = require('../util/CssClasses');
import JenkinsConnector = require('./JenkinsConnector');
import JenkinsDetailsModel = require('./JenkinsDetailsModel');
import Config = require('../jsonInterfaces/Config');
import JenkinsJsonResponse = require('../jsonInterfaces/JenkinsResponse');

/**
 * Model that represents a Jenkins Job
 */
class JenkinsMonitorModel implements MonitorModel {

    private static OPACITY:string = 'opacity: ';
    private static DEFAULT_OPACITY:number = 1.0;

    private _connector:Connector;
    private _name:string;
    private _externalRef:string;
    private _hostname:string;
    private _css:KnockoutComputed<string>;
    private _style:KnockoutComputed<string>;
    private _completedPercent:KnockoutComputed<number>;
    private _buildingStyle:KnockoutComputed<string>;
    private _details:JenkinsDetailsModel;
    private _jsonResponse:KnockoutObservable<JenkinsJsonResponse.Json> = ko.observable<JenkinsJsonResponse.Json>();

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(job:Config.SimpleMonitor, connector:Connector, hostname:string) {
        this._connector = connector;
        this._name = job.name !== undefined ? job.name : job.externalRef;
        this._externalRef = job.externalRef;
        this._hostname = job.hostname !== undefined ? job.hostname : hostname;
        this._details = new JenkinsDetailsModel((<JenkinsConnector>connector).getJobUrl(this), this._name);
        this._css = ko.computed<string>({
                read: ()=>{
                    return CssClasses.BASIC_CLASSES + JenkinsMonitorModel.translateColor(this.getResponseColor());
                }
        });
        this._buildingStyle = ko.computed<string>({
                read: ()=>{
                    return JenkinsMonitorModel.translateBuildingStyle(this.getResponseColor());
                }
        });
        this._style = ko.computed<string>({
            read: ()=>{
                return JenkinsMonitorModel.OPACITY+JenkinsMonitorModel.calculateExpiration(this.getResponseTimestamp(), (<JenkinsConnector>this._connector).getExpiry());
            }
        });
        this._completedPercent = ko.computed<number>({
            read: ()=>{
                return JenkinsMonitorModel.calculateCompletedPercent(this.getResponseTimestamp(), this.getEstimatedDuration());
            }
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getName():string {
        return this._name;
    }

    public getHtmlsafeId():string {
        var _PATTERN:RegExp = new RegExp('\\W','g');
        var _REPLACEMENT_CHAR = '-';
        return this._externalRef.replace(_PATTERN,_REPLACEMENT_CHAR);
    }

    public getCompletedPercent():number {
        return this._completedPercent();
    }

    public getHostname():string {
        return this._hostname;
    }

    public getCss():string {
        return this._css();
    }

    public getBuildingStyle():string {
        return this._buildingStyle();
    }

    public getStyle():string {
        return this._style();
    }

    public getDetails():JenkinsDetailsModel {
        return this._details;
    }

    public getType():string {
        return Types.JENKINS;
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getExternalRef():string {
        return this._externalRef;
    }

    public updateStatus():void {
        this._connector.getRemoteData(this);
    }

    public setData(json:JenkinsJsonResponse.Json):void {
        this._jsonResponse(json);
        this._details.setData(json);
    }

    //==================================================================================================================
    // Private
    //==================================================================================================================

    private static calculateCompletedPercent(buildTimestamp: number, estimatedDuration:number):number {
        var completedPercent:number;

        var nowTimestamp:number = new Date().getTime();

        if(buildTimestamp === undefined || estimatedDuration === undefined) {
            return undefined;
        }

        completedPercent = Math.round((nowTimestamp - buildTimestamp) * 100 / estimatedDuration);

        return completedPercent;
    }

    /**
     * Get expiration based on the amount of time that passed between the {@link JenkinsJsonResponse.LastBuild.timestamp} and now.
     *
     * @param expiry time in hours
     * @param buildTimestamp
     *
     * @returns number between 0.25 (=expired) and 1.0 (job ran recently)
     */
    private static calculateExpiration(buildTimestamp: number, expiry: number):number {

        if(buildTimestamp === undefined) {
            return JenkinsMonitorModel.DEFAULT_OPACITY;
        }

        var expireStyle:number;

        //calculate timestamp and expiration
        var nowTimestamp:number = new Date().getTime();
        var ageMinutes:number = Math.round(nowTimestamp - buildTimestamp) / (1000 * 60);
        var expiredPercent = 1 - (ageMinutes / (expiry * 60));  // 0=expired, 1=fresh

        if (expiredPercent < 0) {

            // age has exceeded ttl
            expireStyle = 0.25;
        }
        else {

            // age is within ttl
            expireStyle = 0.5 + (expiredPercent * 0.5);
        }

        return expireStyle;
    }

    /**
     * Translate colors from Jenkins to twitter bootstrap styles
     * @param color
     * @returns string
     */
    private static translateColor(color:string):string {
        var colorTranslation:string;

        switch(color){
            case 'blue':
                colorTranslation = CssClasses.SUCCESS;
                break;
            case 'red':
                colorTranslation = CssClasses.FAILURE;
                break;
            case 'yellow':
                colorTranslation = CssClasses.WARNING;
                break;
            case 'aborted':
                colorTranslation = CssClasses.ABORTED;
                break;
            case 'yellow_anime':
                colorTranslation = CssClasses.WARNING;
                break;
            case 'red_anime':
                colorTranslation = CssClasses.FAILURE;
                break;
            case 'blue_anime':
                colorTranslation = CssClasses.SUCCESS;
                break;
            case 'aborted_anime':
                colorTranslation = CssClasses.ABORTED;
                break;
            case 'notbuilt':
                colorTranslation = CssClasses.DISABLED;
                break;
            case 'disabled':
                colorTranslation = CssClasses.DISABLED;
                break;
            default:
                colorTranslation = "";
        }

        return colorTranslation;
    }

    private static translateBuildingStyle(color:string):string {
        var colorTranslation:string;

        switch(color){
            case 'yellow_anime':
                colorTranslation = CssClasses.WARNING_PROGRESS_BUILDING;
                break;
            case 'red_anime':
                colorTranslation = CssClasses.FAILURE_PROGRESS_BUILDING;
                break;
            case 'blue_anime':
                colorTranslation = CssClasses.SUCCESS_PROGRESS_BUILDING;
                break;
            case 'aborted_anime':
                colorTranslation = CssClasses.ABORTED_PROGRESS_BUILDING;
                break;
            case 'notbuilt_anime':
                colorTranslation = CssClasses.DISABLED_PROGRESS_BUILDING;
                break;
            case 'disabled_anime':
                colorTranslation = CssClasses.DISABLED_PROGRESS_BUILDING;
                break;
            default:
                colorTranslation = undefined;
        }

        return colorTranslation;
    }

    private getResponseColor():string {
        var color:string = undefined;
        if(this._jsonResponse() !== undefined) {
            color = this._jsonResponse().color;
        }
        return color;
    }

    private getResponseTimestamp():number {
        var timestamp:number = undefined;
        if(this._jsonResponse() !== undefined) {
            timestamp = this._jsonResponse().lastBuild.timestamp;
        }
        return timestamp;
    }

    private getEstimatedDuration():number {
        var estimatedDuration:number = undefined;
        if(this._jsonResponse() !== undefined) {
            estimatedDuration = this._jsonResponse().lastBuild.estimatedDuration;
        }
        return estimatedDuration;
    }
}

export = JenkinsMonitorModel;
