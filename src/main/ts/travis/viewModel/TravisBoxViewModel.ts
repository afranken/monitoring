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
                return CssClasses.BASIC_CLASSES + TravisBoxViewModel.translateColor(this._model.getResponseColor());
            }
        });
        this._style = ko.computed<string>({
            read: () => {
                return TravisBoxViewModel.OPACITY + ExpirationCalculator
                    .calculateExpiration(this._model.getResponseTimestamp(), this._model.getExpiry());
            }
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getHtmlsafeId(): string {
        return this._model.getHtmlsafeId();
    }

    public getStyle(): string {
        return this._style();
    }

    public getBuildingStyle(): string {
        return undefined;
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

    /**
     * Translate colors from Travis to twitter bootstrap styles
     * @param color
     * @returns string
     */
    private static translateColor(color: number): string {
        var colorTranslation: string;

        switch (color) {
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

}

export = TravisBoxViewModel;
