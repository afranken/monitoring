/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import SonarViolation = require("./SonarViolation");

/**
 * Model that represents one Sonar module
 */
class SonarViolationModel {

    private _moduleName:string;
    private _name:string;
    private _url:KnockoutObservable<string> = ko.observable<string>();
    private _violations: Array<SonarViolation> = [];

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(moduleName:string, name:string) {
        this._moduleName = moduleName;
        this._name = name;
        this._url('');

        this.init();
    }

    private init():void {
        this._violations.push(new SonarViolation(SonarViolation.BLOCKER));
        this._violations.push(new SonarViolation(SonarViolation.CRITICAL));
        this._violations.push(new SonarViolation(SonarViolation.MAJOR));
        this._violations.push(new SonarViolation(SonarViolation.MINOR));
        this._violations.push(new SonarViolation(SonarViolation.INFO));
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getViolations():Array<SonarViolation> {
        return this._violations;
    }

    public getModuleName():string {
        return this._moduleName;
    }

    public getName():string {
        return this._name;
    }

    public getUrl():string {
        return this._url();
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public setUrl(url:string):void {
        this._url(url);
    }

}

export = SonarViolationModel;