///ts:ref=knockout.d.ts
/// <reference path="../../vendor/knockout.d.ts"/> ///ts:ref:generated
///ts:ref=Config.d.ts
/// <reference path="../../jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:ref=JenkinsResponse.d.ts
/// <reference path="../../jsonInterfaces/JenkinsResponse.d.ts"/> ///ts:ref:generated
///ts:import=Connector
import Connector = require('../../connector/Connector'); ///ts:import:generated
///ts:import=MonitorModel
import MonitorModel = require('../../model/MonitorModel'); ///ts:import:generated
///ts:import=JenkinsConnector
import JenkinsConnector = require('../connector/JenkinsConnector'); ///ts:import:generated

import ko = require('knockout');
import Config = require('Config');
import JenkinsJsonResponse = require('JenkinsJsonResponse');

/**
 * Model that is used to access and store data from the Jenkins backend.
 */
class JenkinsMonitorModel implements MonitorModel {

    private _connector: Connector;
    private _name: string;
    private _externalRef: string;
    private _hostname: string;
    private _jsonResponse: KnockoutObservable<JenkinsJsonResponse.Json> = ko.observable<JenkinsJsonResponse.Json>();

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
        return (<JenkinsConnector>this._connector).getJobUrl(this);
    }

    public getExpiry(): number {
        return (<JenkinsConnector>this._connector).getExpiry();
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

    public setData(json: JenkinsJsonResponse.Json): void {
        this._jsonResponse(json);
    }

    public getLastBuild(): JenkinsJsonResponse.LastBuild {
        var lastBuild: JenkinsJsonResponse.LastBuild = undefined;
        if (this._jsonResponse()) {
            lastBuild = this._jsonResponse().lastBuild;
        }
        return lastBuild;
    }

    /**
     * @returns {JenkinsJsonResponse.Revision} lastBuildRevision if it's available, or {@link undefined}
     */
    public getLastBuiltRevision(): JenkinsJsonResponse.Revision {
        var revision: JenkinsJsonResponse.Revision = undefined;
        if (this.getLastBuild()) {
            this.getLastBuild().actions.forEach((action) => {
                if (action.lastBuiltRevision) {
                    revision = action.lastBuiltRevision;
                }
            });
        }
        return revision;
    }

    public getResponseColor(): string {
        var color: string = undefined;
        if (this._jsonResponse()) {
            color = this._jsonResponse().color;
        }
        return color;
    }

    public getResponseTimestamp(): number {
        var timestamp: number = undefined;
        if (this.getLastBuild()) {
            timestamp = this.getLastBuild().timestamp;
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

    public getBuildNumber(): number {
        var buildNumber: number = undefined;
        if (this.getLastBuild()) {
            buildNumber = this.getLastBuild().number;
        }
        return buildNumber;
    }

    public getLastBuildUrl(): string {
        var url: string = undefined;
        if (this.getLastBuild()) {
            url = this.getLastBuild().url;
        }
        return url;
    }

    public getLastBuildCommitHash(): string {
        var commit: string = undefined;
        if (this.getLastBuiltRevision()) {
            this.getLastBuiltRevision().branch.forEach((singleBranch) => {
                if (singleBranch.SHA1) {
                    commit = singleBranch.SHA1.slice(0, 12);
                }
            });
        }
        return commit;
    }

    public getLastBuildBranchName(): string {
        var name: string = undefined;
        if (this.getLastBuiltRevision()) {
            this.getLastBuiltRevision().branch.forEach((singleBranch) => {
                if (singleBranch.name) {
                    name = singleBranch.name;
                }
            });
        }
        return name;
    }

    public getEstimatedDuration(): number {
        var estimatedDuration: number = undefined;
        if (this.getLastBuild()) {
            estimatedDuration = this.getLastBuild().estimatedDuration;
        }
        return estimatedDuration;
    }
}

export = JenkinsMonitorModel;
