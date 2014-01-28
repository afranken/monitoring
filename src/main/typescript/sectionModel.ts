/// <reference path="json.d.ts" />
/// <reference path="vendor/knockout.d.ts" />
/// <reference path="vendor/collections.ts" />
/// <reference path="jobmodel.ts" />
/// <reference path="jenkinsjobmodel.ts" />

class SectionModel {

    constructor(private section:Section) {
        this.title = section.title;
        this.url = section.url;
        this.description = section.description;

        if(section.sections !== undefined) {
            section.sections.forEach(subSection => {
                    var sectionViewModel = new SectionModel(subSection);
                    this.sections.push(sectionViewModel);
                }
            );
        }



        if(section.jobs !== undefined) {
            section.jobs.forEach(job => {
                    var jobViewModel;
                    if(job.type === undefined || job.type === "jenkins") {
                        jobViewModel = new JenkinsJobModel(job);
                    }
                    else if(job.type === "sonar") {

                    } else if (job.type === "nagios") {

                    }
                    this.jobs.push(jobViewModel);
                }
            );
        }
    }

    public title:string;
    public url:string;
    public description:string;
    public jobs:JobModel[] = [];
    public sections:SectionModel[] = [];

}