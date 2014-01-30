/// <reference path="vendor/jquery.d.ts" />
/// <reference path="vendor/knockout.d.ts" />
import JobModel = require("JobModel")
import Connector = require("Connector")
import JsonInterfaces = require("JsonInterfaces");
import ko = require("knockout");

class JenkinsJobModel implements JobModel {

    public title:string;
    public type:string;
    public url:string;
    public status:KnockoutObservable<string> = ko.observable<string>();

    private connector: Connector;
    private basicStyle:string = "jobstatus alert";

    constructor(private job:JsonInterfaces.Job, connector: Connector) {
        this.title = job.title;
        this.url = job.url;
        this.status(this.basicStyle);
        this.type = job.type !== undefined ? job.type : 'jenkins';
        this.connector = connector;
    }

    public updateStatus():void {
        var self = this;
        window.setTimeout(function () {

            
            var color = self.translateColor(self.connector.getJson("",""));



            // Whatever happens here happens because of the AJAX call having completed.
            self.status(self.basicStyle + " " + color);
        }, 1000);
    }

    //translate colors from Jenkins to bootstrap styles
    public translateColor(color:string):string {
        var colorTranslation;
        if (color === 'blue') {
            colorTranslation = "alert-success";
        }
        else if (color === 'red') {
            colorTranslation = "alert-danger";
        }
        else if (color === 'yellow') {
            colorTranslation = "alert-warning";
        }
        else if (color === 'yellow_anime') {
            colorTranslation = "status-building alert-warning";
        }
        else if (color === 'red_anime') {
            colorTranslation = "status-building alert-danger";
        }
        else if (color === 'blue_anime') {
            colorTranslation = "status-building alert-success";
        }
        else {
            colorTranslation = "alert-disabled";
        }
        return colorTranslation;
    }
}

export = JenkinsJobModel;
