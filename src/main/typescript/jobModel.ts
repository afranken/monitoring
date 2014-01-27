/// <reference path="json.d.ts" />
/// <reference path="vendor/knockout.d.ts" />

class JobModel {

    constructor(private job:Job) {
        this.title = job.title;
        this.url = job.url;
        this.status(this.basicStyle);
    }

    public updateStatus() {
        this.status(this.basicStyle + " alert-success");
    }

    public title:string;
    public url:string;
    public status:KnockoutObservable<string> = ko.observable<string>();

    private basicStyle: string = "jobstatus alert";

}