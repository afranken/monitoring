/// <reference path="vendor/knockout.d.ts" />
import JobModel = require("JobModel")
import Connector = require("Connector")
import JenkinsJobModel = require("JenkinsJobModel")
import JsonInterfaces = require("JsonInterfaces");

class SectionModel {

    public title:string;
    public url:string;
    public description:string;
    public jobs:JobModel[] = [];
    public sections:SectionModel[] = [];

    constructor(private section:JsonInterfaces.Section, private connectors: {[type: string]: Connector}) {
        this.title = section.title;
        this.url = section.url;
        this.description = section.description;

        this.init(section, connectors);
    }

    private init(section: JsonInterfaces.Section, connectors: {[type: string]: Connector}) {
        if(section.sections !== undefined) {
            section.sections.forEach(subSection => {
                    var sectionViewModel = new SectionModel(subSection, connectors);
                    this.sections.push(sectionViewModel);
                }
            );
        }

        if(section.jobs !== undefined) {
            section.jobs.forEach(job => {
                    var jobViewModel;
                    if(job.type === undefined || job.type === "jenkins") {
                        jobViewModel = new JenkinsJobModel(job, connectors[job.type]);
                    }
                    else if(job.type === "sonar") {

                    } else if (job.type === "nagios") {

                    }
                    this.jobs.push(jobViewModel);
                }
            );
        }
    }

}

export = SectionModel;
