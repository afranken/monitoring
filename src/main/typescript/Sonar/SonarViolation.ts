/// <reference path="../vendor/knockout.d.ts" />
import ko = require("knockout");
import Interfaces = require("../JsonInterfaces");

class SonarViolation {

    public static BASIC_CLASSES:string = "codeviolation alert ";

    public static BLOCKER:string = "blocker_violations";
    public static CRITICAL:string = "critical_violations";
    public static MAJOR:string = "major_violations";
    public static MINOR:string = "minor_violations";
    public static INFO:string = "info_violations";

    public status:KnockoutObservable<string> = ko.observable<string>();
    public count:KnockoutObservable<number> = ko.observable<number>();

    constructor(public type:string) {
        this.count(0);
        this.status(SonarViolation.BASIC_CLASSES);
    }

    public setStatus(count:number): void{
        if(count > 0) {
            if(this.type === SonarViolation.BLOCKER || this.type === SonarViolation.CRITICAL) {
                this.status(SonarViolation.BASIC_CLASSES + "alert-danger");
            } else {
                this.status(SonarViolation.BASIC_CLASSES + "alert-warning");
            }
        } else {
            this.status(SonarViolation.BASIC_CLASSES + "alert-success");
        }
    }

    public setCount(violations: Interfaces.SonarViolations):void {
        var vio: number = 0;
        violations[0].msr.forEach(violation => {
            if(this.type === violation.key) {
                //in some versions of Sonar, values will be formatted "789.0" instead of "789"
                if(violation.val.toString().indexOf('.')>0) {
                    this.count(parseInt(violation.val.toString().substring(0,violation.val.toString().indexOf('.'))));
                } else {
                    this.count(violation.val);
                }
            }
        });
    }

}

export = SonarViolation;