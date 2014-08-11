///ts:ref=knockout.d.ts
/// <reference path="../../vendor/knockout.d.ts"/> ///ts:ref:generated
///ts:ref=moment.d.ts
/// <reference path="../../vendor/moment.d.ts"/> ///ts:ref:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../model/TravisMonitorModel'); ///ts:import:generated

import ko = require('knockout');
import moment = require('moment');

/**
 * ViewModel that is used to display Travis Details.
 */
class TravisDetailsViewModel {

    private _model: TravisMonitorModel;

    private _startDate: KnockoutComputed<string>;
    private _commitHash: KnockoutComputed<string>;
    private _branchName: KnockoutComputed<string>;
    private _runTime: KnockoutComputed<string>;
    private _buildNumber: KnockoutComputed<string>;
    private _buildNumberUrl: KnockoutComputed<string>;

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(model: TravisMonitorModel) {
        this._model = model;

        this.init();
    }

    /**
     * Initialize computed properties.
     */
    private init(): void {
        this._commitHash = ko.computed<string>({
            read: () => {
                return this._model.getLastBuildCommitHash();
            }
        });

        this._branchName = ko.computed<string>({
            read: () => {
                return this._model.getLastBuildBranchName();
            }
        });

        this._runTime = ko.computed<string>({
            read: () => {
                return this.calculateDuration();
            }
        });

        this._buildNumber = ko.computed<string>({
            read: () => {
                return this._model.getBuildNumber();
            }
        });

        this._buildNumberUrl = ko.computed<string>({
            read: () => {
                return this._model.getLastBuildUrl();
            }
        });

        this._startDate = ko.computed<string>({
            read: () => {
                return this.calculateStartDate();
            }
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getUrl(): string {
        return this._model.getJobUrl();
    }

    public getName(): string {
        return this._model.getName();
    }

    public getCommitHash(): string {
        return this._commitHash();
    }

    public getBranchName(): string {
        return this._branchName();
    }

    public getRunTime(): string {
        return this._runTime();
    }

    public getBuildNumber(): string {
        return this._buildNumber();
    }

    public getBuildNumberUrl(): string {
        return this._buildNumberUrl();
    }

    public getStartDate(): string {
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
    private calculateStartDate(): string {
        var startTime: string = undefined;
        if (this._model.getResponseTimestamp()) {
            startTime = moment(this._model.getResponseTimestamp()).fromNow();
        }

        return startTime;
    }

    /**
     * Calculate a human readable duration based on a timestamp.
     *
     * @returns string a human readable start date like "a day ago" or {@link undefined}
     */
    private calculateDuration(): string {
        var duration: string = undefined;
        if (this._model.getDuration()) {
            duration = moment.duration(this._model.getDuration() * 1000).humanize();
        }

        return duration;
    }

}

export = TravisDetailsViewModel;
