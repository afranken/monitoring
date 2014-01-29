/// <reference path="vendor/knockout.d.ts" />
import JobModel = require("jobmodel");
import SectionModel = require("sectionmodel");
import Json = require("json");

class ApplicationViewModel {

    constructor(private json:Json.Application) {
        this.title = json.title;
        this.configuration = json.settings;
        json.sections.forEach(section => {
                var sectionModel = new SectionModel(section);
                this.sections.push(sectionModel)
            }
        );
    }

    public getData(node: Node, job: JobModel) {
        job.updateStatus();
    }

    public title:string;
    public configuration: Json.Settings;
    public sections:SectionModel[] = [];

}