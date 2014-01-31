/// <reference path="vendor/jquery.d.ts" />
/// <reference path="vendor/knockout.d.ts" />
import JobModel = require("JobModel")
import Connector = require("Connector")
import JenkinsConnector = require("JenkinsConnector")
import JsonInterfaces = require("JsonInterfaces");
import ko = require("knockout");

class JenkinsJobModel implements JobModel {

    public title:string;
    public type:string;
    public url:string;
    public name:string;
    public hostname:string;
    public status:KnockoutObservable<string> = ko.observable<string>();
    public style:KnockoutObservable<string> = ko.observable<string>();

    private connector: Connector;

    constructor(private job:JsonInterfaces.Job, connector:Connector, hostname:string) {
        this.title = job.title;
        this.name = job.name;
        this.hostname = job.hostname !== undefined ? job.hostname : hostname;
        this.status(JenkinsConnector.BASIC_CLASSES);
        this.style(JenkinsConnector.BASIC_STYLE);
        this.type = job.type !== undefined ? job.type : 'jenkins';
        this.connector = connector;
        this.url = "http://" + this.hostname + "/job/" + this.name;
    }

    public updateStatus():void {
        this.connector.getJson(this.url,this.hostname,this.status, this.style);
    }

}

export = JenkinsJobModel;
