/// <reference path="../vendor/knockout.d.ts" />
/// <reference path="../vendor/moment.d.ts" />
import ko = require('knockout');
import moment = require('moment');
import JenkinsJsonResponse = require('../jsonInterfaces/JenkinsResponse');

/**
 * This model is used to store and retrieve detailed data about one Jenkins job.
 */
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

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(url:string, name:string) {
        this._url = url;
        this._name = name;

        this.init();
    }

    private init():void {
        this._commitHash = ko.computed<string>({
            read: ()=>{
                var commit:string = undefined;
                if(this.getLastBuiltRevision()) {
                    this.getLastBuiltRevision().branch.forEach((singleBranch)=>{
                        if(singleBranch.SHA1) {
                            commit = singleBranch.SHA1.slice(0,12);
                        }
                    });
                }
                return commit;
            }
        });

        this._branchName = ko.computed<string>({
            read: ()=>{
                var name:string = undefined;
                if(this.getLastBuiltRevision()) {
                    this.getLastBuiltRevision().branch.forEach((singleBranch)=>{
                        if(singleBranch.name) {
                            name = singleBranch.name;
                        }
                    });
                }
                return name;
            }
        });

        this._runTime = ko.computed<string>({
            read: ()=>{
                return this.calculateDuration();
            }
        });

        this._buildNumber = ko.computed<number>({
            read: ()=>{
                var buildNumber:number = undefined;
                if(this.getLastBuild()) {
                    buildNumber = this.getLastBuild().number;
                }
                return buildNumber;
            }
        });

        this._buildNumberUrl = ko.computed<string>({
            read: ()=>{
                var buildNumberUrl:string = undefined;
                if(this.getLastBuild()) {
                    buildNumberUrl = this.getLastBuild().url;
                }
                return buildNumberUrl;
            }
        });

        this._startDate = ko.computed<string>({
            read: ()=>{
                return this.calculateStartDate();
            }
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

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

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public setData(json:JenkinsJsonResponse.Json):void {
        this._jsonResponse(json);
    }

    //==================================================================================================================
    // Private
    //==================================================================================================================

    /**
     * Calculate a human readable start date based on a timestamp.
     *
     * @returns string a human readable start date like "a day ago" or {@link undefined}
     */
    private calculateStartDate():string {
        var startTime:string = undefined;
        if(this.getLastBuild()) {
            startTime = moment(this.getLastBuild().timestamp).fromNow();
        }

        return startTime;
    }

    /**
     * Calculate a human readable duration based on a timestamp.
     *
     * @returns string a human readable start date like "a day ago" or {@link undefined}
     */
    private calculateDuration():string {
        var duration:string = undefined;
        if(this.getLastBuild()) {
            duration = moment.duration(this.getLastBuild().duration).humanize();
        }

        return duration;
    }

    /**
     * @returns {JenkinsJsonResponse.Revision} lastBuildRevision if it's available, or {@link undefined}
     */
    private getLastBuiltRevision():JenkinsJsonResponse.Revision {
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

    private getLastBuild():JenkinsJsonResponse.LastBuild {
        var lastBuild:JenkinsJsonResponse.LastBuild = undefined;
        if(this._jsonResponse()) {
            lastBuild = this._jsonResponse().lastBuild;
        }
        return lastBuild;
    }
}

export = JenkinsDetailsModel;