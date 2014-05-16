/// <reference path="../../vendor/knockout.d.ts" />
import ko = require('knockout');
import Config = require('../../jsonInterfaces/Config');
import SonarResponse = require('../../jsonInterfaces/SonarResponse');
import MonitorModel = require('../../model/MonitorModel');
import SonarConnector = require('../connector/SonarConnector');
import SonarModuleModel = require('./SonarModuleModel');

/**
 * Model that represents a list of Sonar modules
 */
class SonarMonitorModel implements MonitorModel {

    private _url:KnockoutObservable<string> = ko.observable<string>();
    private _moduleModels: Array<SonarModuleModel> = [];
    private _name:string;
    private _hostname:string;
    private _externalRef:Config.ExternalRef[];
    private _connector:SonarConnector;
    private _jsonResponse:KnockoutObservable<SonarResponse.Jsons> = ko.observable<SonarResponse.Jsons>();

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(monitor:Config.ExtendedMonitor, connector:SonarConnector, hostname:string) {
        this._name = monitor.name;
        this._hostname = monitor.hostname !== undefined ? monitor.hostname : hostname;
        this._externalRef = monitor.externalRef;
        this._connector = connector;
        this._url('');

        this.init(monitor.externalRef);

        this.updateStatus();
    }

    private init(externalRef:Config.ExternalRef[]) {
        externalRef.forEach(ref => {
            this._moduleModels.push(new SonarModuleModel(ref.id, ref.name));
        });
    }

    //==================================================================================================================
    // Functionality
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

    public getModuleModels():Array<SonarModuleModel> {
        return this._moduleModels;
    }

    public getExternalRef():Config.ExternalRef[] {
        return this._externalRef;
    }

    public setData(json:SonarResponse.Jsons):void {
        this._jsonResponse(json);
    }

    public addViolations(moduleName:string, violations:SonarResponse.Jsons):void {
        this._moduleModels.forEach(violationModel => {
            if(violationModel.getModuleName() === moduleName) {
                violationModel.getViolations().forEach(violation => {
                    violation.setCount(violations);
                    violation.setStatus(violation.getCount());
                });
            }
        });
    }

    public addUrl(moduleName:string, url:string):void {
        this._moduleModels.forEach(violationModel => {
            if(violationModel.getModuleName() === moduleName) {
                violationModel.setUrl(url);
            }
        });
    }

    //==================================================================================================================
    // Private
    //==================================================================================================================

    private updateStatus():void {
        this._connector.getRemoteData(this);
    }

}

export = SonarMonitorModel;