/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import Types = require('../util/Types');
import Config = require('../jsonInterfaces/Config');
import SonarResponse = require('../jsonInterfaces/SonarResponse');
import MonitorModel = require('../monitorModel/MonitorModel');
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
    private _externalRef:Config.ExternalRef[];
    private _jsonResponse:KnockoutObservable<SonarResponse.Jsons> = ko.observable<SonarResponse.Jsons>();

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(private monitor:Config.ExtendedMonitor, public connector:Connector, hostname:string) {
        this._name = monitor.name;
        this._hostname = monitor.hostname !== undefined ? monitor.hostname : hostname;
        this._externalRef = monitor.externalRef;
        this._url('');

        this.init(monitor.externalRef);
    }

    private init(externalRef:Config.ExternalRef[]) {
        externalRef.forEach(ref => {
            this._violationModels.push(new SonarViolationModel(ref.id, ref.name));
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getUrl():string {
        return this._url();
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

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getExternalRef():Config.ExternalRef[] {
        return this._externalRef;
    }

    public updateStatus():void {
        this.connector.getRemoteData(this);
    }

    public setData(json:SonarResponse.Jsons):void {
        this._jsonResponse(json);
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

}

export = SonarMonitorModel;