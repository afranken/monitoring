/// <reference path="json.d.ts" />
/// <reference path="vendor/collections.ts" />
/// <reference path="vendor/knockout.d.ts" />
/// <reference path="sectionModel.ts" />
/// <reference path="jobModel.ts" />


class ApplicationViewModel {

    constructor(private json:Application) {
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
    public configuration:Configuration;
    public sections:SectionModel[] = [];

}