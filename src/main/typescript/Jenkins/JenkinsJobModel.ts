/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../vendor/knockout.d.ts" />
import JobModel = require("../JobModel")
import Connector = require("../Connector")
import JenkinsConnector = require("./JenkinsConnector")
import JsonInterfaces = require("../JsonInterfaces");
import ko = require("knockout");

class JenkinsJobModel implements JobModel {

    public static TYPE = 'jenkins';

    public name:string;
    public type:string = JenkinsJobModel.TYPE;
    public url:string;
    public id:string;
    public hostname:string;
    public status:KnockoutObservable<string> = ko.observable<string>();
    public style:KnockoutObservable<string> = ko.observable<string>();

    constructor(private job:JsonInterfaces.Job, public connector:Connector, hostname:string) {
        this.name = job.name;
        this.id = job.id;
        this.hostname = job.hostname !== undefined ? job.hostname : hostname;
        this.status(JenkinsConnector.BASIC_CLASSES);
        this.style(JenkinsConnector.BASIC_STYLE);
        this.url = "http://" + this.hostname + "/job/" + this.id;
    }

    public updateStatus():void {
        this.connector.getJson(this.url,this.hostname,this);
    }

}

export = JenkinsJobModel;
