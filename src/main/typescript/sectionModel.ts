/// <reference path="json.d.ts" />
/// <reference path="vendor/knockout.d.ts" />
/// <reference path="vendor/collections.ts" />
/// <reference path="jobModel.ts" />

class SectionModel {

    constructor(private section:Section) {
        this.title = section.title;

        if(section.subSections !== undefined) {
            section.subSections.forEach(subSection => {
                    var sectionViewModel = new SectionModel(subSection);
                    this.subSections.push(sectionViewModel);
                }
            );
        }


        if(section.jobList !== undefined) {
            section.jobList.forEach(job => {
                    var jobViewModel = new JobModel(job);
                    this.jobList.push(jobViewModel);
                }
            );
        }
    }

    public title:string;
    public jobList:JobModel[] = [];
    public subSections:SectionModel[] = [];

}