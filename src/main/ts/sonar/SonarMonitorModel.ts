/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import Types = require('../Types');
import Config = require('../jsonInterfaces/Config');
import SonarResponse = require('../jsonInterfaces/SonarResponse');
import MonitorModel = require('../MonitorModel');
import Connector = require('../connector/Connector');
import SonarViolationModel = require('./SonarViolationModel');

/**
 * Model that represents a list of Sonar modules
 */
class SonarMonitorModel implements MonitorModel {

    private _url:KnockoutObservable<string> = ko.observable<string>();
    private _violationModels: Array<SonarViolationModel> = [];
    private _name:string;
    private _hostname:string;
    private _id:string;
    private _jsonResponse:KnockoutObservable<SonarResponse.Jsons> = ko.observable<SonarResponse.Jsons>();

    constructor(private monitor:Config.Monitor, public connector:Connector, hostname:string) {
        this._name = monitor.name;
        this._hostname = monitor.hostname !== undefined ? monitor.hostname : hostname;
        this._id = monitor.id;
        this._url('');

        this.init(monitor.id);
    }

    private init(id:string) {
        var sonarModules:string[] = id.split(',');
        sonarModules.forEach(moduleName => {
            this._violationModels.push(new SonarViolationModel(moduleName));
        });
    }

    public updateStatus():void {
        this.connector.getRemoteData(this);
    }

    public setData(json:SonarResponse.Jsons):void {
        this._jsonResponse(json);
    }

    public getUrl():string {
        return this._url();
    }

    public getId():string {
        return this._id;
    }

    public getName():string {
        return this._name;
    }

    public getHostname():string {
        return this._hostname;
    }

    public getViolationModels():Array<SonarViolationModel> {
        return this._violationModels;
    }

    public getType():string {
        return Types.SONAR;
    }

    public addViolations(moduleName:string, violations:SonarResponse.Jsons):void {
        this._violationModels.forEach(violationModel => {
            if(violationModel.getModuleName() === moduleName) {
                violationModel.getViolations().forEach(violation => {
                    violation.setCount(violations);
                    violation.setStatus(violation.getCount());
                });
            }
        });
    }

    public addUrl(moduleName:string, url:string):void {
        this._violationModels.forEach(violationModel => {
            if(violationModel.getModuleName() === moduleName) {
                violationModel.setUrl(url);
            }
        });
    }

    public addName(moduleName:string, name:string):void {
        this._violationModels.forEach(violationModel => {
            if(violationModel.getModuleName() === moduleName) {
                violationModel.setName(name);
            }
        });
    }

}

export = SonarMonitorModel;