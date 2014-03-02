/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import Types = require('../Types');
import MonitorModel = require('../MonitorModel');
import Connector = require('../connector/Connector');
import CssClasses = require('../CssClasses');
import JenkinsConnector = require('./JenkinsConnector');
import Config = require('../jsonInterfaces/Config');

/**
 * Model that represents a Jenkins Job
 */
class JenkinsMonitorModel implements MonitorModel {

    private _name:string;
    private _id:string;
    private _hostname:string;
    public _status:KnockoutObservable<string> = ko.observable<string>();
    public _style:KnockoutObservable<string> = ko.observable<string>();
    public _url:KnockoutObservable<string> = ko.observable<string>();

    constructor(private job:Config.Monitor, private connector:Connector, hostname:string) {
        this._name = job.name;
        this._id = job.id;
        this._hostname = job.hostname !== undefined ? job.hostname : hostname;
        this._status(CssClasses.BASIC_CLASSES);
        this._style(JenkinsConnector.BASIC_STYLE);
        this._url('');
    }

    public updateStatus():void {
        this.connector.getRemoteData(this);
    }

    public getName():string {
        return this._name;
    }

    public getId():string {
        return this._id;
    }

    public getHostname():string {
        return this._hostname;
    }

    public getStatus():string {
        return this._status();
    }

    public getStyle():string {
        return this._style();
    }

    public getUrl():string {
        return this._url();
    }

    public getType():string {
        return Types.JENKINS;
    }

}

export = JenkinsMonitorModel;
