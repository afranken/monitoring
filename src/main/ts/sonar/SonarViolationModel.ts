/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import SonarViolation = require("./SonarViolation");


class SonarViolationModel {

    private _moduleName:string;
    private _name:KnockoutObservable<string> = ko.observable<string>();
    private _url:KnockoutObservable<string> = ko.observable<string>();
    private _violations: Array<SonarViolation> = [];

    constructor(moduleName:string) {
        this._moduleName = moduleName;
        this._url('');
        this._name('');

        this.init();
    }

    private init():void {
        this._violations.push(new SonarViolation(SonarViolation.BLOCKER));
        this._violations.push(new SonarViolation(SonarViolation.CRITICAL));
        this._violations.push(new SonarViolation(SonarViolation.MAJOR));
        this._violations.push(new SonarViolation(SonarViolation.MINOR));
        this._violations.push(new SonarViolation(SonarViolation.INFO));
    }

    public getViolations():Array<SonarViolation> {
        return this._violations;
    }

    public getModuleName():string {
        return this._moduleName;
    }

    public getName():string {
        return this._name();
    }

    public setName(name:string):void {
        this._name(name);
    }

    public getUrl():string {
        return this._url();
    }

    public setUrl(url:string):void {
        this._url(url);
    }

}

export = SonarViolationModel;