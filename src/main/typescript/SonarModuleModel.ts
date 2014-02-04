/// <reference path="vendor/knockout.d.ts" />
import ko = require("knockout");
import JobModel = require("JobModel");
import Connector = require("Connector");

/**
 * TODO: clean up
 */
class SonarModuleModel implements JobModel{

    public static BASIC_CLASSES = "codeviolation alert ";

    private static BLOCKER:string = "blocker_violations";
    private static CRITICAL:string = "critical_violations";
    private static MAJOR:string = "major_violations";
    private static MINOR:string = "minor_violations";
    private static INFO:string = "info_violations";

    public typeMapping: {[type: string]: {[count: KnockoutObservable<number>]: KnockoutObservable<number>;}} = {};

    public blocker:KnockoutObservable<number> = ko.observable<number>();
    public critical:KnockoutObservable<number> = ko.observable<number>();
    public major:KnockoutObservable<number> = ko.observable<number>();
    public minor:KnockoutObservable<number> = ko.observable<number>();
    public info:KnockoutObservable<number> = ko.observable<number>();

    public blockerStatus:KnockoutObservable<string> = ko.observable<string>();
    public criticalStatus:KnockoutObservable<string> = ko.observable<string>();
    public majorStatus:KnockoutObservable<string> = ko.observable<string>();
    public minorStatus:KnockoutObservable<string> = ko.observable<string>();
    public infoStatus:KnockoutObservable<string> = ko.observable<string>();

    public url:KnockoutObservable<string> = ko.observable<string>();

    constructor(public name:string, public id:string, private hostname:string, private connector: Connector) {
        this.blocker(0);
        this.critical(0);
        this.major(0);
        this.minor(0);
        this.info(0);
        this.url("");
        this.blockerStatus(SonarModuleModel.BASIC_CLASSES);
        this.criticalStatus(SonarModuleModel.BASIC_CLASSES);
        this.majorStatus(SonarModuleModel.BASIC_CLASSES);
        this.minorStatus(SonarModuleModel.BASIC_CLASSES);
        this.infoStatus(SonarModuleModel.BASIC_CLASSES);


    }

    private init(){
        this.typeMapping[SonarModuleModel.BLOCKER] = {  }
    }

    updateStatus():void {
        this.connector.getJson(this.id,this.hostname,this);
    }

}

export = SonarModuleModel;