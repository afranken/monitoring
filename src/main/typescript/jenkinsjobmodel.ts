/// <reference path="json.d.ts" />
/// <reference path="jobmodel.ts" />
/// <reference path="vendor/knockout.d.ts" />

class JenkinsJobModel implements JobModel {

    constructor(private job:Job) {
        this.title = job.title;
        this.url = job.url;
        this.status(this.basicStyle);
        this.type = job.type;
    }

    public updateStatus():void {
        var color = this.translateColor('blue');
        var self = this;
        window.setTimeout(function () {
            // Whatever happens here happens because of the AJAX call having completed.
            self.status(self.basicStyle + " " + color);
        }, 1000);
    }

    //translate colors from Jenkins to bootstrap styles
    public translateColor(color:string):string {
        var colorTranslation;
        if (color === 'blue') {
            colorTranslation = "alert-success";
        }
        else if (color === 'red') {
            colorTranslation = "alert-danger";
        }
        else if (color === 'yellow') {
            colorTranslation = "alert-warning";
        }
        else if (color === 'yellow_anime') {
            colorTranslation = "status-building alert-warning";
        }
        else if (color === 'red_anime') {
            colorTranslation = "status-building alert-danger";
        }
        else if (color === 'blue_anime') {
            colorTranslation = "status-building alert-success";
        }
        else {
            colorTranslation = "alert-disabled";
        }
        return colorTranslation;
    }

    public title:string;
    public type:string;
    public url:string;
    public status:KnockoutObservable<string> = ko.observable<string>();

    private basicStyle:string = "jobstatus alert";

}