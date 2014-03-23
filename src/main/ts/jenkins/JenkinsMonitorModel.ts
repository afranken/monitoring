/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../vendor/knockout.d.ts" />
/// <reference path="../vendor/moment.d.ts" />
import ko = require('knockout');
import moment = require('moment');
import Types = require('../Types');
import MonitorModel = require('../monitorModel/MonitorModel');
import MonitorModels = require('../monitorModel/MonitorModels');
import Connector = require('../connector/Connector');
import CssClasses = require('../CssClasses');
import JenkinsConnector = require('./JenkinsConnector');
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
    private _id:string;
    private _hostname:string;
    private _css:KnockoutComputed<string>;
    private _style:KnockoutComputed<string>;
    private _startDate:KnockoutComputed<string>;
    private _commitHash:KnockoutComputed<string>;
    private _branchName:KnockoutComputed<string>;
    private _runTime:KnockoutComputed<string>;
    private _buildNumber:KnockoutComputed<number>;
    private _buildNumberUrl:KnockoutComputed<string>;
    private _completedPercent:KnockoutComputed<number>;
    private _buildingStyle:KnockoutComputed<string>;
    private _url:string;
    private _jsonResponse:KnockoutObservable<JenkinsJsonResponse.Json> = ko.observable<JenkinsJsonResponse.Json>();

    constructor(job:Config.Monitor, connector:Connector, hostname:string) {
        this._connector = connector;
        this._name = job.name;
        this._id = job.id;
        this._hostname = job.hostname !== undefined ? job.hostname : hostname;
        this._css = ko.computed<string>({
                owner: this,
                read: ()=>{
                    return CssClasses.BASIC_CLASSES + JenkinsMonitorModel.translateColor(this.getResponseColor());
                }
        });
        this._buildingStyle = ko.computed<string>({
                owner: this,
                read: ()=>{
                    return JenkinsMonitorModel.translateBuildingStyle(this.getResponseColor());
                }
        });
        this._style = ko.computed<string>({
            owner: this,
            read: ()=>{
                return JenkinsMonitorModel.OPACITY+JenkinsMonitorModel.calculateExpiration(this.getResponseTimestamp(), (<JenkinsConnector>this._connector).getExpiry());
            }
        });
        this._completedPercent = ko.computed<number>({
            owner: this,
            read: ()=>{
                return JenkinsMonitorModel.calculateCompletedPercent(this.getResponseTimestamp(), this.getEstimatedDuration());
            }
        });
        this._commitHash = ko.computed<string>({
            owner: this,
            read: ()=>{
                var commit:string = undefined;
                if(this._jsonResponse() !== undefined) {
                    var revision:JenkinsJsonResponse.Revision = this.getLastBuiltRevision(this._jsonResponse());
                    if(revision !== undefined) {
                        revision.branch.forEach((singleBranch)=>{
                            if(singleBranch.SHA1) {
                                commit = singleBranch.SHA1.slice(0,12);
                            }
                        });
                    }
                }
                return commit;
            }
        });

        this._branchName = ko.computed<string>({
            owner: this,
            read: ()=>{
                var name:string = undefined;
                if(this._jsonResponse() !== undefined) {
                    var revision:JenkinsJsonResponse.Revision = this.getLastBuiltRevision(this._jsonResponse());
                    if(revision !== undefined) {
                        revision.branch.forEach((singleBranch)=>{
                            if(singleBranch.name) {
                                name = singleBranch.name;
                            }
                        });
                    }
                }
                return name;
            }
        });

        this._runTime = ko.computed<string>({
            owner: this,
            read: ()=>{
                var duration:string = undefined;
                if(this._jsonResponse() !== undefined) {
                    var buildDuration = (this._jsonResponse().lastBuild.duration);
                    if(buildDuration !== undefined) {
                        duration = moment.duration(buildDuration).humanize();
                    }
                }
                return duration;
            }
        });

        this._buildNumber = ko.computed<number>({
            owner: this,
            read: ()=>{
                var buildNumber:number = undefined;
                if(this._jsonResponse() !== undefined) {
                    buildNumber = (this._jsonResponse().lastBuild.number);
                }
                return buildNumber;
            }
        });

        this._buildNumberUrl = ko.computed<string>({
            owner: this,
            read: ()=>{
                var buildNumberUrl:string = undefined;
                if(this._jsonResponse() !== undefined) {
                    buildNumberUrl = (this._jsonResponse().lastBuild.url);
                }
                return buildNumberUrl;
            }
        });

        this._startDate = ko.computed<string>({
            owner: this,
            read: ()=>{
                return JenkinsMonitorModel.calculateStartDate(this.getResponseTimestamp());
            }
        });
        this._url = (<JenkinsConnector>connector).getJobUrl(this);
    }

    public updateStatus():void {
        this._connector.getRemoteData(this);
    }

    public getName():string {
        return this._name !== undefined ? this._name : this._id;
    }

    public getId():string {
        return this._id;
    }

    public getHtmlsafeId():string {
        var _PATTERN:RegExp = new RegExp('\\W','g');
        var _REPLACEMENT_CHAR = '-';
        return this._id.replace(_PATTERN,_REPLACEMENT_CHAR);
    }

    public getCommitHash():string {
        return this._commitHash();
    }

    public getBranchName():string {
        return this._branchName();
    }

    public getRunTime():string {
        return this._runTime();
    }

    public getBuildNumber():number {
        return this._buildNumber();
    }

    public getBuildNumberUrl():string {
        return this._buildNumberUrl();
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

    public getUrl():string {
        return this._url;
    }

    public getStartDate():string {
        return this._startDate();
    }

    public getType():string {
        return Types.JENKINS;
    }

    public setData(json:JenkinsJsonResponse.Json):void {
        this._jsonResponse(json);
    }

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

    private static calculateStartDate(buildTimestamp: number):string {
        var startTime:string;
        if(buildTimestamp === undefined) {
            return undefined;
        }

        startTime = moment(buildTimestamp).fromNow();

        return startTime;
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
            case 'yellow_anime':
                colorTranslation = CssClasses.WARNING;
                break;
            case 'red_anime':
                colorTranslation = CssClasses.FAILURE;
                break;
            case 'blue_anime':
                colorTranslation = CssClasses.SUCCESS;
                break;
            case 'notbuilt':
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
            default:
                colorTranslation = undefined;
        }

        return colorTranslation;
    }

    private getLastBuiltRevision(json:JenkinsJsonResponse.Json):JenkinsJsonResponse.Revision {
        var revision:JenkinsJsonResponse.Revision = undefined;
        var lastBuild:JenkinsJsonResponse.LastBuild = json.lastBuild;
        lastBuild.actions.forEach((action) => {
            if(action.lastBuiltRevision) {
                revision = action.lastBuiltRevision;
            }
        });
        return revision;
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

    private getResponseColor():string {
        var color:string = undefined;
        if(this._jsonResponse() !== undefined) {
            color = this._jsonResponse().color;
        }
        return color;
    }
}

export = JenkinsMonitorModel;
