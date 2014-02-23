/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import Config = require('../JsonInterfaces/Config');
import SonarResponse = require('../JsonInterfaces/SonarResponse');
import MonitorModel = require('../MonitorModel');
import Connector = require('../Connector');
import SonarViolationModel = require('./SonarViolationModel');

/**
 *
 */
class SonarMonitorModel implements MonitorModel {

    public static TYPE: string = 'sonar';
    public type:string = SonarMonitorModel.TYPE;
    public url:KnockoutObservable<string> = ko.observable<string>();
    public violationModels: Array<SonarViolationModel> = [];
    public name:string;
    public hostname:string;
    public id:string;

    constructor(private monitor:Config.Monitor, public connector:Connector, hostname:string) {
        this.name = monitor.name;
        this.hostname = monitor.hostname !== undefined ? monitor.hostname : hostname;
        this.type = SonarMonitorModel.TYPE;
        this.id = monitor.id;
        this.url('');

        this.init(monitor.id);
    }

    private init(id:string) {
        var sonarModules:string[] = id.split(',');
        sonarModules.forEach(moduleName => {
            this.violationModels.push(new SonarViolationModel(moduleName));
        });
    }

    public updateStatus():void {
        this.connector.getRemoteData(this);
    }

    public addViolations(moduleName:string, violations:SonarResponse.SonarJsons):void {
        this.violationModels.forEach(violationModel => {
            if(violationModel.moduleName === moduleName) {
                violationModel.violations.forEach(violation => {
                    violation.setCount(violations);
                    violation.setStatus(violation.count());
                });
            }
        });
    }

    public addUrl(moduleName:string, url:string):void {
        this.violationModels.forEach(violationModel => {
            if(violationModel.moduleName === moduleName) {
                violationModel.url(url);
            }
        });
    }

    public addName(moduleName:string, name:string):void {
        this.violationModels.forEach(violationModel => {
            if(violationModel.moduleName === moduleName) {
                violationModel.name(name);
            }
        });
    }

}

export = SonarMonitorModel;