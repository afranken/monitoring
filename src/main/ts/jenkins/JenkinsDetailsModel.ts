/// <reference path="../vendor/knockout.d.ts" />
/// <reference path="../vendor/moment.d.ts" />
import ko = require('knockout');
import moment = require('moment');
import JenkinsJsonResponse = require('../jsonInterfaces/JenkinsResponse');

class JenkinsDetailsModel {

    private _name:string;
    private _url:string;
    private _startDate:KnockoutComputed<string>;
    private _commitHash:KnockoutComputed<string>;
    private _branchName:KnockoutComputed<string>;
    private _runTime:KnockoutComputed<string>;
    private _buildNumber:KnockoutComputed<number>;
    private _buildNumberUrl:KnockoutComputed<string>;
    private _jsonResponse:KnockoutObservable<JenkinsJsonResponse.Json> = ko.observable<JenkinsJsonResponse.Json>();

    constructor(url:string, name:string) {

        this._url = url;
        this._name = name;
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
                return JenkinsDetailsModel.calculateStartDate(this.getResponseTimestamp());
            }
        });
    }

    public getUrl():string {
        return this._url;
    }

    public getName():string {
        return this._name;
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

    public getStartDate():string {
        return this._startDate();
    }

    public setData(json:JenkinsJsonResponse.Json):void {
        this._jsonResponse(json);
    }

    //==================================================================================================================

    private static calculateStartDate(buildTimestamp: number):string {
        var startTime:string;
        if(buildTimestamp === undefined) {
            return undefined;
        }

        startTime = moment(buildTimestamp).fromNow();

        return startTime;
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
}

export = JenkinsDetailsModel;