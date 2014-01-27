/// <reference path="json.d.ts" />
/// <reference path="vendor/knockout.d.ts" />

class JobModel {

    constructor(private job:Job) {
        this.title = job.title;
        this.url = job.url;
        this.status("unknown");
    }

    public setStatus(title: string): void {
        this.status("TEST");
    }

    private title:string;
    public url:string;
    public status:KnockoutObservable<string> = ko.observable<string>();

}