/// <reference path="../../vendor/knockout.d.ts" />
/// <reference path="../../jsonInterfaces/Config.d.ts" />
/// <reference path="../../jsonInterfaces/SonarResponse.d.ts" />
import ko = require('knockout');
import Config = require('Config');
import SonarResponse = require('SonarJsonResponse');
///ts:import=MonitorModel
import MonitorModel = require('../../model/MonitorModel'); ///ts:import:generated
///ts:import=SonarConnector
import SonarConnector = require('../connector/SonarConnector'); ///ts:import:generated
///ts:import=SonarModuleModel
import SonarModuleModel = require('./SonarModuleModel'); ///ts:import:generated

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
    private _jsonResponse:KnockoutObservable<Array<SonarResponse.Json>> = ko.observable<Array<SonarResponse.Json>>();

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

    public setData(json: Array<SonarResponse.Json>):void {
        this._jsonResponse(json);
    }

    public updateStatus():void {
        this._connector.getRemoteData(this);
    }

    public addViolations(moduleName:string, violations: Array<SonarResponse.Json>):void {
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

}

export = SonarMonitorModel;