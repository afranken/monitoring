/// <reference path="vendor/knockout.d.ts" />
import JobModel = require("JobModel")
import Connector = require("Connector")
import JenkinsJobModel = require("JenkinsJobModel")
import SonarJobModel = require("SonarJobModel")
import JsonInterfaces = require("JsonInterfaces");

class SectionModel {

    public title:string;
    public url:string;
    public description:string;
    public jobs:JobModel[] = [];
    public sonar:SonarJobModel[] = [];
    public sections:SectionModel[] = [];

    constructor(private section:JsonInterfaces.Section, private connectors: {[type: string]: Connector}, private hostname: string) {
        this.title = section.title;
        this.url = section.url;
        this.description = section.description;
        this.hostname = section.hostname !== undefined ? section.hostname : hostname;

        this.init(section, connectors);
    }

    private init(section: JsonInterfaces.Section, connectors: {[type: string]: Connector}) {
        if(section.sections !== undefined) {
            section.sections.forEach(subSection => {
                    var sectionViewModel = new SectionModel(subSection, connectors, this.hostname);
                    this.sections.push(sectionViewModel);
                }
            );
        }

        if(section.jobs !== undefined) {
            section.jobs.forEach(job => {
                    var jobViewModel;
                    if(job.type === undefined || job.type === JenkinsJobModel.TYPE) {
                        jobViewModel = new JenkinsJobModel(job, connectors[JenkinsJobModel.TYPE], this.hostname);
                    }
                    this.jobs.push(jobViewModel);
                }
            );
        }

        if(section.sonar !== undefined) {
            section.sonar.forEach(sonar => {
                    var jobViewModel;
                        jobViewModel = new SonarJobModel(sonar, connectors[SonarJobModel.TYPE], this.hostname);
                    this.sonar.push(jobViewModel);
                }
            );
        }
    }

}

export = SectionModel;
