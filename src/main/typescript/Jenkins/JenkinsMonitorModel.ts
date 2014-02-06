/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../vendor/knockout.d.ts" />
import MonitorModel = require('../MonitorModel');
import Connector = require('../Connector');
import JenkinsConnector = require('./JenkinsConnector');
import JsonInterfaces = require('../JsonInterfaces');
import ko = require('knockout');

class JenkinsJobModel implements MonitorModel {

    public static TYPE = 'jenkins';

    public type:string = JenkinsJobModel.TYPE;
    public name:string;
    public id:string;
    public hostname:string;
    public status:KnockoutObservable<string> = ko.observable<string>();
    public style:KnockoutObservable<string> = ko.observable<string>();
    public url:string;

    constructor(private job:JsonInterfaces.Monitor, public connector:Connector, hostname:string) {
        this.name = job.name;
        this.id = job.id;
        this.hostname = job.hostname !== undefined ? job.hostname : hostname;
        this.status(JenkinsConnector.BASIC_CLASSES);
        this.style(JenkinsConnector.BASIC_STYLE);
        this.url = 'http://' + this.hostname + '/job/' + this.id;
    }

    public updateStatus():void {
        this.connector.getJson(this.url,this.hostname,this);
    }

}

export = JenkinsJobModel;
