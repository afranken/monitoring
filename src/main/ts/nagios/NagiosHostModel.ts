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

    private _hostname:string;
    private _url:string;
    private _allServices:KnockoutObservable<string> = ko.observable<string>();
    private _brokenServices:KnockoutObservable<string> = ko.observable<string>();
    private _css:KnockoutObservable<string> = ko.observable<string>();
    private _text:KnockoutComputed<string>;
    private _detailText:KnockoutComputed<string>;

    constructor(hostname:string, url:string) {
        this._css(CssClasses.BASIC_CLASSES);
        this._url = url;
        this._hostname = hostname;
        this._text = ko.computed<string>({
            owner: this,
            read: ()=>{
                return this.getBrokenServices();
            }
        });
        this._detailText = ko.computed<string>({
            owner: this,
            read: ()=>{
                return this.getAllServices();
            }
        });
    }

    public getHostname():string {
        return this._hostname;
    }

    public getUrl(): string {
        return this._url;
    }

    public getCss(): string {
        return this._css() === CssClasses.BASIC_CLASSES ? this._css() : this._css() + CssClasses.BASIC_CLASSES;
    }

    private getBrokenServices(): string {
        return this._brokenServices();
    }

    public getText(): string {
        return this._text();
    }

    public getDetailText(): string {
        return this._detailText();
    }

    private setBrokenServices(service: string): void {
        if(this._brokenServices() === undefined || this._brokenServices() === '') {
            this._brokenServices(service);
        } else {
            this._brokenServices(this._brokenServices() + '<br/>' + service);
        }
    }

    private getAllServices(): string {
        return this._allServices();
    }

    private setAllServices(service: string): void {
        if(this._allServices() === undefined || this._allServices() === '') {
            this._allServices(service);
        } else {
            this._allServices(this._allServices() + '<br/>' + service);
        }
    }

    private setCss(css: string): void {
        if(css === CssClasses.FAILURE) {
            //always overwrite status with FAILURE
            this._css(css);
        } else if(css === CssClasses.WARNING && this._css() !== CssClasses.FAILURE) {
            this._css(css);
        } else if(css === CssClasses.SUCCESS && this._css() !== CssClasses.FAILURE && this._css() !== CssClasses.WARNING) {
            this._css(css);
        }
    }

    public addService(service: NagiosJsonResponse.NagiosService){
        var status = service.service_status;
        this.setAllServices(service.service_description)
        if (status === NagiosHostModel.STATUS_OK) {
            this.setCss(CssClasses.SUCCESS);
        }
        else if (status === NagiosHostModel.STATUS_CRITICAL) {
            this.setCss(CssClasses.FAILURE);
            this.setBrokenServices(service.service_description);
        }
        else if (status === NagiosHostModel.STATUS_WARNING) {
            this.setCss(CssClasses.WARNING);
            this.setBrokenServices(service.service_description);
        }
        else {
            this.setCss(CssClasses.DISABLED);
        }
    }

}

export = NagiosHostModel;