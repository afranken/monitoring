/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import Types = require('../Types');
import Config = require('../jsonInterfaces/Config');
import MonitorModel = require('../MonitorModel');
import Connector = require('../connector/Connector');
import CssClasses = require('../CssClasses');
import NagiosConnector = require('./NagiosConnector');
import NagiosHostModel = require('./NagiosHostModel');
import NagiosJsonResponse = require('../jsonInterfaces/NagiosResponse');

/**
 * Model that represents a list of Nagios hosts
 */
class NagiosMonitorModel implements MonitorModel {

    private _hostmodels:Array<NagiosHostModel> = [];
    private _id:string;
    private _hostname:string;
    private _name:string;
    private _connector:NagiosConnector;
    private _jsonResponse:KnockoutObservable<NagiosJsonResponse.NagiosServices> = ko.observable<NagiosJsonResponse.NagiosServices>();

    constructor(job:Config.Monitor, connector:Connector, hostname:string) {
        this._name = job.name;
        this._id = job.id;
        this._connector = <NagiosConnector>connector;
        this._hostname = job.hostname !== undefined ? job.hostname : hostname;

        this.init(job.id);
    }

    private init(id:string) {
        var hostnames:string[] = id.split(',');
        hostnames.forEach((hostname:string) => {
            var nagiosHostModel = new NagiosHostModel(hostname);
            nagiosHostModel.setUrl(this._connector.getHostInfoUrl(this._hostname, hostname));
            this._hostmodels.push(nagiosHostModel);
        });
    }

    public getId():string {
        return this._id;
    }

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
        this._jsonResponse(json);
    }



}

export = NagiosMonitorModel;