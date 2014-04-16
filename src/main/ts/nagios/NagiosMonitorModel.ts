/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import Types = require('Types');
import Config = require('jsonInterfaces/Config');
import MonitorModel = require('monitorModel/MonitorModel');
import Connector = require('connector/Connector');
import CssClasses = require('CssClasses');
import NagiosConnector = require('nagios/NagiosConnector');
import NagiosHostModel = require('nagios/NagiosHostModel');
import NagiosJsonResponse = require('jsonInterfaces/NagiosResponse');

/**
 * Model that represents a list of Nagios hosts.
 * This is necessary because the Nagios API can only answer with a list of all hosts with all services.
 * In order to save bandwidth and CPU time on the Nagios server, data is retrieved once and update all {@link NagiosHostModel}s.
 */
class NagiosMonitorModel implements MonitorModel {

    private _hostmodels:Array<NagiosHostModel> = [];
    private _hostname:string;
    private _name:string;
    private _connector:NagiosConnector;

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(job:Config.ExtendedMonitor, connector:Connector, hostname:string) {
        this._name = job.name;
        this._connector = <NagiosConnector>connector;
        this._hostname = job.hostname !== undefined ? job.hostname : hostname;

        this.init(job.externalRef);
    }

    private init(externalRef:Config.ExternalRef[]) {
        externalRef.forEach((ref) => {
            var name = ref.name !== undefined ? ref.name : ref.id;
            var nagiosHostModel = new NagiosHostModel(name, ref.id, this._connector.getHostInfoUrl(this._hostname, ref.id));
            this._hostmodels.push(nagiosHostModel);
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getHostname():string {
        return this._hostname;
    }

    public getName():string {
        return this._name;
    }

    public getHostmodels():Array<NagiosHostModel> {
        return this._hostmodels;
    }

    public getType():string {
        return Types.NAGIOS;
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public addService(hostname:string, service:NagiosJsonResponse.NagiosService):void {
        this._hostmodels.forEach(hostmodel => {
            if (hostmodel.getHostname() === hostname) {
                hostmodel.addService(service);
            }
        });
    }

    public updateStatus():void {
        this._connector.getRemoteData(this);
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

    //==================================================================================================================
    // Private
    //==================================================================================================================

    /**
     * Reset all hostmodel data.
     */
    private resetHostModels():void {
        this._hostmodels.forEach(hostmodel => {
            hostmodel.resetData();
        });
    }

}

export = NagiosMonitorModel;