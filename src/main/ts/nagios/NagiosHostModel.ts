/// <reference path="../vendor/knockout.d.ts" />
import ko = require('knockout');
import CssClasses = require('../CssClasses');
import NagiosJsonResponse = require('../jsonInterfaces/NagiosResponse');

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

    private _hostname:string;
    private _status:KnockoutObservable<string> = ko.observable<string>();
    private _text:KnockoutObservable<string> = ko.observable<string>();
    private _url:KnockoutObservable<string> = ko.observable<string>();
    private _services:KnockoutObservableArray<NagiosJsonResponse.NagiosService> = ko.observableArray<NagiosJsonResponse.NagiosService>();
    private _jsonResponse:KnockoutObservable<NagiosJsonResponse.NagiosServices> = ko.observable<NagiosJsonResponse.NagiosServices>();

    constructor(hostname:string) {
        this._status(CssClasses.BASIC_CLASSES);
        this._text('');
        this._url('');
        this._hostname = hostname;
    }

    public getHostname():string {
        return this._hostname;
    }

    public getUrl(): string {
        return this._url();
    }

    public setUrl(url:string) {
        this._url(url);
    }

    public getText(): string {
        return this._text() === '' ? NagiosHostModel.SERVICES_OK : this._text();
    }

    private setText(text: string): void {
        if(this._text() === '') {
            this._text(text);
        } else {
            this._text(this._text() + '<br/>' + text);
        }
    }

    public getStatus(): string {
        return this._status() === CssClasses.BASIC_CLASSES ? this._status() : this._status() + CssClasses.BASIC_CLASSES;
    }

    private setStatus(status: string): void {
        if(status === CssClasses.FAILURE) {
            //always overwrite status with FAILURE
            this._status(status);
        } else if(status === CssClasses.WARNING && this._status() !== CssClasses.FAILURE) {
            this._status(status);
        } else if(status === CssClasses.SUCCESS && this._status() !== CssClasses.FAILURE && this._status() !== CssClasses.WARNING) {
            this._status(status);
        }
    }

    public addService(service: NagiosJsonResponse.NagiosService){
        this._services.push(service);
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