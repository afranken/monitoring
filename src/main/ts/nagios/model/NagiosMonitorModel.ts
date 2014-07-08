///ts:ref=knockout.d.ts
/// <reference path="../../vendor/knockout.d.ts"/> ///ts:ref:generated
///ts:ref=Config.d.ts
/// <reference path="../../jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:ref=NagiosResponse.d.ts
/// <reference path="../../jsonInterfaces/NagiosResponse.d.ts"/> ///ts:ref:generated
import ko = require('knockout');
import Config = require('Config');
import NagiosJsonResponse = require('NagiosJsonResponse');
///ts:import=MonitorModel
import MonitorModel = require('../../model/MonitorModel'); ///ts:import:generated
///ts:import=Connector
import Connector = require('../../connector/Connector'); ///ts:import:generated
///ts:import=CssClasses
import CssClasses = require('../../util/CssClasses'); ///ts:import:generated
///ts:import=NagiosConnector
import NagiosConnector = require('../connector/NagiosConnector'); ///ts:import:generated
///ts:import=NagiosHostModel
import NagiosHostModel = require('./NagiosHostModel'); ///ts:import:generated

/**
 * Model that represents a list of Nagios hosts.
 * This is necessary because the Nagios API can only answer with a list of all hosts with all services.
 * In order to save bandwidth and CPU time on the Nagios server, data is retrieved once and updates all {@link NagiosHostModel}s.
 */
class NagiosMonitorModel implements MonitorModel {

    private _hostname:string;
    private _name:string;
    private _connector:NagiosConnector;
    private _hostModelMap:{[hostName: string]: NagiosHostModel} = {};
    private _hostnames:Array<string> = [];

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(job:Config.ExtendedMonitor, connector:NagiosConnector, hostname:string) {
        this._name = job.name;
        this._connector = connector;
        this._hostname = job.hostname !== undefined ? job.hostname : hostname;

        this.init(job.externalRef);
    }

    private init(externalRef:Config.ExternalRef[]) {
        externalRef.forEach((ref) => {
            var name = ref.name !== undefined ? ref.name : ref.id;
            this._hostnames.push(name);
            this._hostModelMap[name] = new NagiosHostModel(name, ref.id, this._connector.getHostInfoUrl(this._hostname, ref.id));
        });
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getHostname():string {
        return this._hostname;
    }

    public getHostnames():Array<string> {
        return this._hostnames;
    }

    public getName():string {
        return this._name;
    }

    public getHostModel(name:string):NagiosHostModel {
        return this._hostModelMap[name];
    }

    public addService(hostname:string, service:NagiosJsonResponse.NagiosService):void {
        var hostmodel = this._hostModelMap[hostname];
        if(hostmodel) {
            hostmodel.addService(service);
        }
    }

    public setData(json:NagiosJsonResponse.NagiosServices):void {
        //reset hostmodel data before adding services from nagios response.
        this.resetHostModels();

        //--------- iterate over JSON response, save services that should be displayed
        json.services.forEach((service:NagiosJsonResponse.NagiosService)=>{
            if(service.service_host !== undefined && service.service_host.host_name !== undefined) {
                this.addService(service.service_host.host_name,service);
            }
        });
    }

    public updateStatus():void {
        this._connector.getRemoteData(this);
    }

    //==================================================================================================================
    // Private
    //==================================================================================================================

    private resetHostModels():void {
        this._hostnames.forEach((name:string) => {
            this._hostModelMap[name].resetData();
        });
    }

}

export = NagiosMonitorModel;