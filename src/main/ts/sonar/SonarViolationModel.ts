/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import SonarViolation = require("./SonarViolation");


class SonarViolationModel {

    public moduleName:string;
    public name:KnockoutObservable<string> = ko.observable<string>();
    public url:KnockoutObservable<string> = ko.observable<string>();
    public violations: Array<SonarViolation> = [];

    constructor(moduleName:string) {
        this.moduleName = moduleName;
        this.url('asdf');
        this.name('test');

        this.init();
    }


    private init():void {
        this.violations.push(new SonarViolation(SonarViolation.BLOCKER));
        this.violations.push(new SonarViolation(SonarViolation.CRITICAL));
        this.violations.push(new SonarViolation(SonarViolation.MAJOR));
        this.violations.push(new SonarViolation(SonarViolation.MINOR));
        this.violations.push(new SonarViolation(SonarViolation.INFO));
    }

}

export = SonarViolationModel;