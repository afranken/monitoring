/// <reference path="../vendor/knockout.d.ts" />
import CssClasses = require('../CssClasses');
import NagiosJsonResponse = require('../JsonInterfaces/NagiosResponse');
import ko = require('knockout');

class NagiosHostModel {

    /**
     * Service status returned from Nagios
     */
    public static STATUS_OK: string = 'OK';
    public static STATUS_WARNING: string = 'WARNING';
    public static STATUS_CRITICAL: string = 'CRITICAL';
    //string used for the "all ok" box
    public static SERVICES_OK: string = 'All Services OK.';
    public static SERVICES_WARNING: string = 'There were WARNINGs.';
    public static SERVICES_CRITICAL: string = 'There were CRITICALs.';

    private status:KnockoutObservable<string> = ko.observable<string>();
    private text:KnockoutObservable<string> = ko.observable<string>();
    private url:KnockoutObservable<string> = ko.observable<string>();
    private services:KnockoutObservableArray<NagiosJsonResponse.NagiosService> = ko.observableArray<NagiosJsonResponse.NagiosService>();

    constructor(public hostname:string) {
        this.status(CssClasses.BASIC_CLASSES);
        this.text('');
        this.url('');
    }

    public getUrl(): string {
        return this.url();
    }

    public setUrl(url:string) {
        this.url(url);
    }

    public getText(): string {
        return this.text() === '' ? NagiosHostModel.SERVICES_OK : this.text();
    }

    private setText(text: string): void {
        if(this.text() === '') {
            this.text(text);
        } else {
            this.text(this.text() + '<br/>' + text);
        }
    }

    public getStatus(): string {
        return this.status() === CssClasses.BASIC_CLASSES ? CssClasses.BASIC_CLASSES + CssClasses.SUCCESS : this.status() + CssClasses.BASIC_CLASSES;
    }

    private setStatus(status: string): void {
        if(status === CssClasses.FAILURE) {
            //always overwrite status with FAILURE
            this.status(status);
        } else if(status === CssClasses.WARNING && this.status() !== CssClasses.FAILURE) {
            this.status(status);
        } else if(status === CssClasses.SUCCESS && this.status() !== CssClasses.FAILURE && this.status() !== CssClasses.WARNING) {
            this.status(status);
        }
    }

    public addService(service: NagiosJsonResponse.NagiosService){
        this.services.push(service);
        var status = service.service_status;
        if (status === NagiosHostModel.STATUS_OK) {
            this.setStatus(CssClasses.SUCCESS);
        }
        else if (status === NagiosHostModel.STATUS_CRITICAL) {
            this.setStatus(CssClasses.FAILURE);
            this.setText(service.service_description);
        }
        else if (status === NagiosHostModel.STATUS_WARNING) {
            this.setStatus(CssClasses.WARNING);
            this.setText(service.service_description);
        }
        else {
            this.setStatus(CssClasses.DISABLED);
        }
    }

}

export = NagiosHostModel;