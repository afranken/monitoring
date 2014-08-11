///ts:ref=knockout.d.ts
/// <reference path="../../vendor/knockout.d.ts"/> ///ts:ref:generated
///ts:ref=moment.d.ts
/// <reference path="../../vendor/moment.d.ts"/> ///ts:ref:generated
///ts:ref=Config.d.ts
/// <reference path="../../jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:ref=TravisResponse.d.ts
/// <reference path="../../jsonInterfaces/TravisResponse.d.ts"/> ///ts:ref:generated

///ts:import=Connector
import Connector = require('../../connector/Connector'); ///ts:import:generated
///ts:import=MonitorModel
import MonitorModel = require('../../model/MonitorModel'); ///ts:import:generated
///ts:import=TravisConnector
import TravisConnector = require('../connector/TravisConnector'); ///ts:import:generated

import ko = require('knockout');
import Config = require('Config');
import moment = require('moment');
import TravisJsonResponse = require('TravisJsonResponse');

/**
 * Model that is used to access and store data from the Travis backend.
 */
class TravisMonitorModel implements MonitorModel {

    private _connector: Connector;
    private _name: string;
    private _externalRef: string;
    private _hostname: string;
    private _jsonResponse: KnockoutObservable<TravisJsonResponse.Json[]> = ko.observable<TravisJsonResponse.Json[]>();

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(job: Config.SimpleMonitor, connector: Connector, hostname: string) {
        this._connector = connector;
        this._externalRef = job.externalRef;
        this._name = job.name !== undefined ? job.name : job.externalRef;
        this._hostname = job.hostname !== undefined ? job.hostname : hostname;
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getExternalRef(): string {
        return this._externalRef;
    }

    public getJobUrl(): string {
        return (<TravisConnector>this._connector).getJobUrl(this);
    }

    public getExpiry(): number {
        return (<TravisConnector>this._connector).getExpiry();
    }

    public getName(): string {
        return this._name;
    }

    public getHostname(): string {
        return this._hostname;
    }

    public getHtmlsafeId(): string {
        var _PATTERN: RegExp = new RegExp('\\W', 'g');
        var _REPLACEMENT_CHAR = '-';
        return this.getExternalRef().replace(_PATTERN, _REPLACEMENT_CHAR);
    }

    public updateStatus(): void {
        this._connector.getRemoteData(this);
    }

    public setData(json: TravisJsonResponse.Json[]): void {
        this._jsonResponse(json);
    }

    public getLastBuild(): TravisJsonResponse.Json {
        var lastBuild: TravisJsonResponse.Json = undefined;
        if (this._jsonResponse()) {
            if (this._jsonResponse()) {
                lastBuild = this._jsonResponse()[0];
            }
        }
        return lastBuild;
    }

    public getResponseColor(): number {
        var color: number = undefined;
        if (this.getLastBuild()) {
            color = this.getLastBuild().result;
        }
        return color;
    }

    public getResponseTimestamp(): number {
        var timestamp: number = undefined;
        if (this.getLastBuild()) {
            var date: Moment = moment(this.getLastBuild().started_at);
            timestamp = date.valueOf();
        }
        return timestamp;
    }

    public getDuration(): number {
        var duration: number = undefined;
        if (this.getLastBuild()) {
            duration = this.getLastBuild().duration;
        }
        return duration;
    }

    public getBuildNumber():  string {
        var buildNumber:  string = undefined;
        if (this.getLastBuild()) {
            buildNumber = this.getLastBuild().number;
        }
        return buildNumber;
    }

    public getLastBuildUrl(): string {
        var url: string = undefined;
        if (this.getLastBuild()) {
            url = (<TravisConnector>this._connector).getBuildUrl(this, this.getLastBuild());
        }
        return url;
    }

    public getLastBuildCommitHash(): string {
        var commit: string = undefined;
        if (this.getLastBuild()) {
            commit = this.getLastBuild().commit;
        }
        return commit;
    }

    public getLastBuildBranchName(): string {
        var name: string = undefined;
        if (this.getLastBuild()) {
            name = this.getLastBuild().branch;
        }
        return name;
    }
}

export = TravisMonitorModel;
