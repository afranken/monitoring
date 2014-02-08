/// <reference path="vendor/knockout.d.ts" />
import JobModel = require('./MonitorModel');
import SectionModel = require('./SectionModel');
import Config = require('./JsonInterfaces/Config');
import Connector = require('./Connector');
import Configuration = require('./Configuration/Configuration');
import JenkinsConnector = require('./Jenkins/JenkinsConnector');
import JenkinsMonitorModel = require('./Jenkins/JenkinsMonitorModel');
import SonarJobModel = require('./Sonar/SonarJobModel');
import SonarConnector = require('./Sonar/SonarConnector');
import NagiosConnector = require('./Nagios/NagiosConnector');
import NagiosMonitorModel = require('./Nagios/NagiosMonitorModel');
import ko = require('knockout');

class ApplicationViewModel {

    public title:string;
    public configuration: Configuration;
    public sections: Array<SectionModel> = [];
    public connectors: { [type: string]: Connector; } = { };

    constructor(private json:Config.Application) {
        this.title = json.title;
        if(json.configuration !== undefined) {
            this.configuration = new Configuration(json.configuration);
        }

        this.init(json);
    }

    private init(json: Config.Application) {

        //create connectors
        this.connectors[JenkinsMonitorModel.TYPE] = new JenkinsConnector(this.configuration);
        this.connectors[SonarJobModel.TYPE] = new SonarConnector(this.configuration);
        this.connectors[NagiosMonitorModel.TYPE] = new NagiosConnector(this.configuration);

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
//            //add pulsating effect for monitorModels that are currently running
//            for(var i = 0; i < 500; i++) {
//                element.animate({opacity: 'toggle'}, {duration: 1000}).animate({opacity: 'toggle'}, {duration: 1000});
//            }
//        });

    }

}

export = ApplicationViewModel;