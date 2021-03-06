///ts:ref=knockout.d.ts
/// <reference path="../../vendor/knockout.d.ts"/> ///ts:ref:generated
///ts:import=ExpirationCalculator
import ExpirationCalculator = require('../../util/ExpirationCalculator'); ///ts:import:generated
///ts:import=CssClasses
import CssClasses = require('../../util/CssClasses'); ///ts:import:generated
///ts:import=JenkinsMonitorModel
import JenkinsMonitorModel = require('../model/JenkinsMonitorModel'); ///ts:import:generated

import ko = require('knockout');

/**
 * ViewModel that is used to display the Jenkins overview box.
 */
class JenkinsBoxViewModel {

    private static OPACITY: string = 'opacity: ';

    private _model: JenkinsMonitorModel;
    private _css: KnockoutComputed<string>;
    private _style: KnockoutComputed<string>;
    private _completedPercent: KnockoutComputed<number>;
    private _buildingStyle: KnockoutComputed<string>;

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(model: JenkinsMonitorModel) {
        this._model = model;

        this.init();
    }

    /**
     * Initialize computed properties.
     */
    private init(): void {
        this._css = ko.computed<string>({
            read: () => {
                return CssClasses.BASIC_CLASSES + JenkinsBoxViewModel.translateColor(this._model.getResponseColor());
            }
        });
        this._buildingStyle = ko.computed<string>({
            read: () => {
                return JenkinsBoxViewModel.translateBuildingStyle(this._model.getResponseColor());
            }
        });
        this._style = ko.computed<string>({
            read: () => {
                return JenkinsBoxViewModel.OPACITY +
                    ExpirationCalculator.calculateExpiration(this._model.getResponseTimestamp(), this._model.getExpiry());
            }
        });
        this._completedPercent = ko.computed<number>({
            read: () => {
                return JenkinsBoxViewModel.calculateCompletedPercent(this._model.getResponseTimestamp(),
                    this._model.getEstimatedDuration());
            }
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getHtmlsafeId(): string {
        return this._model.getHtmlsafeId();
    }

    public getCompletedPercent(): number {
        return this._completedPercent();
    }

    public getStyle(): string {
        return this._style();
    }

    public getBuildingStyle(): string {
        return this._buildingStyle();
    }

    public getCss(): string {
        return this._css();
    }

    public getName(): string {
        return this._model.getName();
    }

    //==================================================================================================================
    // Private
    //==================================================================================================================

    private static calculateCompletedPercent(buildTimestamp: number, estimatedDuration: number): number {
        var completedPercent: number;

        var nowTimestamp: number = new Date().getTime();

        if (buildTimestamp === undefined || estimatedDuration === undefined) {
            return undefined;
        }

        completedPercent = Math.round((nowTimestamp - buildTimestamp) * 100 / estimatedDuration);

        return completedPercent;
    }

    /**
     * Translate colors from Jenkins to twitter bootstrap styles
     * @param color
     * @returns string
     */
    private static translateColor(color: string): string {
        var colorTranslation: string;

        switch (color) {
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
                colorTranslation = '';
        }

        return colorTranslation;
    }

    private static translateBuildingStyle(color: string): string {
        var colorTranslation: string;

        switch (color) {
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

}

export = JenkinsBoxViewModel;
