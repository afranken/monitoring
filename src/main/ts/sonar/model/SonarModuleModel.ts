///ts:ref=knockout.d.ts
/// <reference path="../../vendor/knockout.d.ts"/> ///ts:ref:generated
///ts:import=SonarViolationModel
import SonarViolationModel = require('./SonarViolationModel'); ///ts:import:generated

import ko = require('knockout');

/**
 * Model that represents data of one Sonar module
 */
class SonarModuleModel {

    private _moduleName: string;
    private _name: string;
    private _url: KnockoutObservable<string> = ko.observable<string>();
    private _violations:  Array<SonarViolationModel> = [];

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(moduleName: string, name: string) {
        this._moduleName = moduleName;
        this._name = name;
        this._url('');

        this.init();
    }

    private init(): void {
        this._violations.push(new SonarViolationModel(SonarViolationModel.BLOCKER));
        this._violations.push(new SonarViolationModel(SonarViolationModel.CRITICAL));
        this._violations.push(new SonarViolationModel(SonarViolationModel.MAJOR));
        this._violations.push(new SonarViolationModel(SonarViolationModel.MINOR));
        this._violations.push(new SonarViolationModel(SonarViolationModel.INFO));
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getViolations(): Array<SonarViolationModel> {
        return this._violations;
    }

    public getModuleName(): string {
        return this._moduleName;
    }

    public getName(): string {
        return this._name;
    }

    public getUrl(): string {
        return this._url();
    }

    public setUrl(url: string): void {
        this._url(url);
    }

}

export = SonarModuleModel;
