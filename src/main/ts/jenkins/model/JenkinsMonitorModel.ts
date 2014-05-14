/// <reference path="../../vendor/jquery.d.ts" />
/// <reference path="../../vendor/knockout.d.ts" />
/// <reference path="../../vendor/moment.d.ts" />
import ko = require('knockout');
import moment = require('moment');
import Config = require('../../jsonInterfaces/Config');
import CssClasses = require('../../util/CssClasses');
import Connector = require('../../connector/Connector');
import MonitorModel = require('../../monitorModel/MonitorModel');
import MonitorModels = require('../../monitorModel/MonitorModels');
import JenkinsConnector = require('../connector/JenkinsConnector');
import JenkinsDetailsModel = require('../viewModel/JenkinsDetailsViewModel');
import JenkinsJsonResponse = require('../../jsonInterfaces/JenkinsResponse');

/**
 * Model that is used to access and store data from the Jenkins backend.
 */
class JenkinsMonitorModel implements MonitorModel {

    private _connector:Connector;
    private _name:string;
    private _externalRef:string;
    private _hostname:string;
    private _jsonResponse:KnockoutObservable<JenkinsJsonResponse.Json> = ko.observable<JenkinsJsonResponse.Json>();

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(job:Config.SimpleMonitor, connector:Connector, hostname:string) {
        this._connector = connector;
        this._externalRef = job.externalRef;
        this._name = job.name !== undefined ? job.name : job.externalRef;
        this._hostname = job.hostname !== undefined ? job.hostname : hostname;

        this.updateStatus();
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getExternalRef():string {
        return this._externalRef;
    }

    public getJobUrl():string {
        return (<JenkinsConnector>this._connector).getJobUrl(this);
    }

    public getExpiry():number {
        return (<JenkinsConnector>this._connector).getExpiry();
    }

    public getName():string {
        return this._name;
    }

    public getHostname():string {
        return this._hostname;
    }

    public getHtmlsafeId():string {
        var _PATTERN:RegExp = new RegExp('\\W','g');
        var _REPLACEMENT_CHAR = '-';
        return this.getExternalRef().replace(_PATTERN,_REPLACEMENT_CHAR);
    }

    public updateStatus():void {
        this._connector.getRemoteData(this);
    }

    public setData(json:JenkinsJsonResponse.Json):void {
        this._jsonResponse(json);
    }

    public getLastBuild():JenkinsJsonResponse.LastBuild {
        var lastBuild:JenkinsJsonResponse.LastBuild = undefined;
        if(this._jsonResponse()) {
            lastBuild = this._jsonResponse().lastBuild;
        }
        return lastBuild;
    }

    /**
     * @returns {JenkinsJsonResponse.Revision} lastBuildRevision if it's available, or {@link undefined}
     */
    public getLastBuiltRevision():JenkinsJsonResponse.Revision {
        var revision:JenkinsJsonResponse.Revision = undefined;
        if(this.getLastBuild()) {
            this.getLastBuild().actions.forEach((action) => {
                if(action.lastBuiltRevision) {
                    revision = action.lastBuiltRevision;
                }
            });
        }
        return revision;
    }

    public getResponseColor():string {
        var color:string = undefined;
        if(this._jsonResponse() !== undefined) {
            color = this._jsonResponse().color;
        }
        return color;
    }

    public getResponseTimestamp():number {
        var timestamp:number = undefined;
        if(this._jsonResponse() !== undefined) {
            timestamp = this._jsonResponse().lastBuild.timestamp;
        }
        return timestamp;
    }

    public getEstimatedDuration():number {
        var estimatedDuration:number = undefined;
        if(this._jsonResponse() !== undefined) {
            estimatedDuration = this._jsonResponse().lastBuild.estimatedDuration;
        }
        return estimatedDuration;
    }
}

export = JenkinsMonitorModel;
