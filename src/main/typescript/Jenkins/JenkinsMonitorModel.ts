/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import MonitorModel = require('../MonitorModel');
import Connector = require('../Connector/Connector');
import CssClasses = require('../CssClasses');
import JenkinsConnector = require('./JenkinsConnector');
import Config = require('../JsonInterfaces/Config');

/**
 * Model that represents a Jenkins Job
 */
class JenkinsMonitorModel implements MonitorModel {

    public static TYPE: string = 'jenkins';

    public name:string;
    public id:string;
    public hostname:string;
    public status:KnockoutObservable<string> = ko.observable<string>();
    public style:KnockoutObservable<string> = ko.observable<string>();
    public url:KnockoutObservable<string> = ko.observable<string>();

    constructor(private job:Config.Monitor, private connector:Connector, hostname:string) {
        this.name = job.name;
        this.id = job.id;
        this.hostname = job.hostname !== undefined ? job.hostname : hostname;
        this.status(CssClasses.BASIC_CLASSES);
        this.style(JenkinsConnector.BASIC_STYLE);
        this.url('');
    }

    public updateStatus():void {
        this.connector.getRemoteData(this);
    }

    public getType():string {
        return JenkinsMonitorModel.TYPE;
    }


}

export = JenkinsMonitorModel;
