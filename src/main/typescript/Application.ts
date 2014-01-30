/// <reference path="vendor/knockout.d.ts" />
import JobModel = require("JobModel");
import SectionModel = require("SectionModel");
import JsonInterfaces = require("JsonInterfaces");
import Connector = require("Connector");
import JenkinsConnector = require("JenkinsConnector");
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
        this.connectors['jenkins'] = new JenkinsConnector();

        json.sections.forEach(section => {
                var sectionModel = new SectionModel(section, this.connectors);

                this.sections.push(sectionModel)
            }
        );

    }

    public getData(node: Node, job: JobModel) {
        job.updateStatus();
    }

}

export = ApplicationViewModel;