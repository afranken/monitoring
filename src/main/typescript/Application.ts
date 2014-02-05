/// <reference path="vendor/knockout.d.ts" />
import JobModel = require("JobModel");
import SectionModel = require("SectionModel");
import JsonInterfaces = require("JsonInterfaces");
import Connector = require("Connector");
import JenkinsConnector = require("Jenkins/JenkinsConnector");
import JenkinsJobModel = require("Jenkins/JenkinsJobModel");
import SonarJobModel = require("Sonar/SonarJobModel");
import SonarConnector = require("Sonar/SonarConnector");
import ko = require("knockout");

class ApplicationViewModel {

    public title:string;
    public configuration: JsonInterfaces.Settings;
    public sections:SectionModel[] = [];
    public connectors: { [type: string]: Connector; } = { };

    constructor(private json:JsonInterfaces.Application) {
        this.title = json.title;
        this.configuration = json.settings;

        this.init(json);
    }

    private init(json: JsonInterfaces.Application) {

        //create connectors
        this.connectors[JenkinsJobModel.TYPE] = new JenkinsConnector(this.configuration);
        this.connectors[SonarJobModel.TYPE] = new SonarConnector(this.configuration);

        json.sections.forEach(section => {
                var sectionModel = new SectionModel(section, this.connectors, undefined);

                this.sections.push(sectionModel)
            }
        );

    }

    public getData(node: Node, job: JobModel) {
        job.updateStatus();

//        jQuery(job).trigger('cssClassChanged');
//        jQuery('.status-building').bind('cssClassChanged', function(element:JQuery){
//            //add pulsating effect for jobs that are currently running
//            for(var i = 0; i < 500; i++) {
//                element.animate({opacity: "toggle"}, {duration: 1000}).animate({opacity: "toggle"}, {duration: 1000});
//            }
//        });

    }

}

export = ApplicationViewModel;