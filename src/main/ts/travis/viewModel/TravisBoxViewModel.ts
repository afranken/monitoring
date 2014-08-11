///ts:ref=knockout.d.ts
/// <reference path="../../vendor/knockout.d.ts"/> ///ts:ref:generated
///ts:import=ExpirationCalculator
import ExpirationCalculator = require('../../util/ExpirationCalculator'); ///ts:import:generated
///ts:import=CssClasses
import CssClasses = require('../../util/CssClasses'); ///ts:import:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../model/TravisMonitorModel'); ///ts:import:generated

import ko = require('knockout');

/**
 * ViewModel that is used to display the Travis overview box.
 */
class TravisBoxViewModel {

    private static OPACITY: string = 'opacity: ';

    private _model: TravisMonitorModel;
    private _css: KnockoutComputed<string>;
    private _style: KnockoutComputed<string>;
    private _completedPercent: KnockoutComputed<number>;
    private _buildingStyle: KnockoutComputed<string>;

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
        this._css = ko.computed<string>({
            read: () => {
                return CssClasses.BASIC_CLASSES + TravisBoxViewModel.translateColor(this._model.getResponseColor(),
                    this._model.getState(), this._model.getLastResponseColor());
            }
        });
        this._style = ko.computed<string>({
            read: () => {
                return TravisBoxViewModel.OPACITY + ExpirationCalculator
                    .calculateExpiration(this._model.getResponseTimestamp(), this._model.getExpiry());
            }
        });
        this._buildingStyle = ko.computed<string>({
            read: () => {
                return TravisBoxViewModel.translateBuildingStyle(this._model.getState(),
                    this._model.getLastResponseColor());
            }
        });
        this._completedPercent = ko.computed<number>({
            read: () => {
                return TravisBoxViewModel.calculateCompletedPercent(this._model.getResponseTimestamp(),
                    this._model.getLastDuration());
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
     * Translate colors from Travis to twitter bootstrap styles
     * @param color
     * @returns string
     */
    private static translateColor(color: number, state: string, lastColor: number): string {
        var colorTranslation: string;
        var toTranslate: number = color;

        if (state === 'started' || state === 'created') {
            toTranslate = lastColor;
        }

        switch (toTranslate) {
            case 0:
                colorTranslation = CssClasses.SUCCESS;
                break;
            case 1:
                colorTranslation = CssClasses.FAILURE;
                break;
            default:
                colorTranslation = '';
        }

        return colorTranslation;
    }

    private static translateBuildingStyle(state: string, lastColor: number): string {
        var colorTranslation: string;

        if (state === 'started' || state === 'created') {
            switch (lastColor) {
                case 0:
                    colorTranslation = CssClasses.SUCCESS_PROGRESS_BUILDING;
                    break;
                case 1:
                    colorTranslation = CssClasses.FAILURE_PROGRESS_BUILDING;
                    break;
                default:
                    colorTranslation = undefined;
            }
        }

        return colorTranslation;
    }

}

export = TravisBoxViewModel;
