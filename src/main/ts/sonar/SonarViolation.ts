/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import Config = require('../jsonInterfaces/Config');
import SonarResponse = require('../jsonInterfaces/SonarResponse');
import CssClasses = require('../CssClasses');

/**
 * Model that represents one violation type
 */
class SonarViolation {

    public static BASIC_CLASSES:string = ' codeviolation ' + CssClasses.BASIC;

    public static BLOCKER:string = 'blocker_violations';
    public static CRITICAL:string = 'critical_violations';
    public static MAJOR:string = 'major_violations';
    public static MINOR:string = 'minor_violations';
    public static INFO:string = 'info_violations';

    private _css:KnockoutComputed<string>;
    private _status:KnockoutObservable<string> = ko.observable<string>();
    private _count:KnockoutObservable<number> = ko.observable<number>();

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(public type:string) {
        this._count(0);
        this._css =  ko.computed<string>({
            read: ()=>{
                return SonarViolation.BASIC_CLASSES + this._status();
            }
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getCss():string {
        return this._css();
    }

    public getCount():number {
        return this._count();
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public setStatus(count:number): void{
        if(count > 0) {
            if(this.type === SonarViolation.BLOCKER || this.type === SonarViolation.CRITICAL) {
                this._status(SonarViolation.BASIC_CLASSES + CssClasses.FAILURE);
            } else {
                this._status(SonarViolation.BASIC_CLASSES + CssClasses.WARNING);
            }
        } else {
            this._status(SonarViolation.BASIC_CLASSES + CssClasses.SUCCESS);
        }
    }

    public setCount(violations: SonarResponse.Jsons):void {
        violations[0].msr.forEach(violation => {
            if(this.type === violation.key) {
                //in some versions of Sonar, values will be formatted '789.0' instead of '789'
                if(violation.val.toString().indexOf('.')>0) {
                    this._count(parseInt(violation.val.toString().substring(0,violation.val.toString().indexOf('.'))));
                } else {
                    this._count(violation.val);
                }
            }
        });
    }

}

export = SonarViolation;