/// <reference path="../../vendor/knockout.d.ts" />
/// <reference path="../../vendor/moment.d.ts" />
import ko = require('knockout');
import moment = require('moment');
import JenkinsMonitorModel = require('../model/JenkinsMonitorModel');
import JenkinsJsonResponse = require('../../jsonInterfaces/JenkinsResponse');

/**
 * This model is used to store and retrieve detailed data about one Jenkins job.
 */
class JenkinsDetailsViewModel {

    private _model:JenkinsMonitorModel;

    private _startDate:KnockoutComputed<string>;
    private _commitHash:KnockoutComputed<string>;
    private _branchName:KnockoutComputed<string>;
    private _runTime:KnockoutComputed<string>;
    private _buildNumber:KnockoutComputed<number>;
    private _buildNumberUrl:KnockoutComputed<string>;

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(model:JenkinsMonitorModel) {
        this._model = model;

        this.init();
    }

    private init():void {
        this._commitHash = ko.computed<string>({
            read: ()=>{
                var commit:string = undefined;
                if(this._model.getLastBuiltRevision()) {
                    this._model.getLastBuiltRevision().branch.forEach((singleBranch)=>{
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
                if(this._model.getLastBuiltRevision()) {
                    this._model.getLastBuiltRevision().branch.forEach((singleBranch)=>{
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
                if(this._model.getLastBuild()) {
                    buildNumber = this._model.getLastBuild().number;
                }
                return buildNumber;
            }
        });

        this._buildNumberUrl = ko.computed<string>({
            read: ()=>{
                var buildNumberUrl:string = undefined;
                if(this._model.getLastBuild()) {
                    buildNumberUrl = this._model.getLastBuild().url;
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
        return this._model.getJobUrl();
    }

    public getName():string {
        return this._model.getName();
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
    // Private
    //==================================================================================================================

    /**
     * Calculate a human readable start date based on a timestamp.
     *
     * @returns string a human readable start date like "a day ago" or {@link undefined}
     */
    private calculateStartDate():string {
        var startTime:string = undefined;
        if(this._model.getLastBuild()) {
            startTime = moment(this._model.getLastBuild().timestamp).fromNow();
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
        if(this._model.getLastBuild()) {
            duration = moment.duration(this._model.getLastBuild().duration).humanize();
        }

        return duration;
    }

}

export = JenkinsDetailsViewModel;