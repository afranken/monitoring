/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import MonitorModel = require('../MonitorModel');
import Connector = require('../Connector');
import SonarViolation = require('./SonarViolation');

/**
 * TODO: clean up
 */
class SonarMonitorModel implements MonitorModel {

    public static TYPE = 'sonar';
    public type:string = SonarMonitorModel.TYPE;
    public url:KnockoutObservable<string> = ko.observable<string>();
    public violations:SonarViolation[] = [];

    constructor(public name:string, public id:string, private hostname:string, private connector: Connector) {
        this.url('');
        this.init();
    }

    private init() {
        this.violations.push(new SonarViolation(SonarViolation.BLOCKER));
        this.violations.push(new SonarViolation(SonarViolation.CRITICAL));
        this.violations.push(new SonarViolation(SonarViolation.MAJOR));
        this.violations.push(new SonarViolation(SonarViolation.MINOR));
        this.violations.push(new SonarViolation(SonarViolation.INFO));
    }

    updateStatus():void {
        this.connector.getJson(this.id,this.hostname,this);
    }

}

export = SonarMonitorModel;