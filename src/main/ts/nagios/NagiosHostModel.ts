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
    private _url:string;
    private _serviceNames:KnockoutComputed<string>;
    private _css:KnockoutObservable<string> = ko.observable<string>();
    private _text:KnockoutObservable<string> = ko.observable<string>();

    constructor(hostname:string, url:string) {
        this._css(CssClasses.BASIC_CLASSES);
        this._url = url;
        this._hostname = hostname;
        this._serviceNames = ko.computed<string>({
            owner: this,
            read: ()=>{
                return this.getText();
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

    private getText(): string {
        return this._text() === '' ? NagiosHostModel.SERVICES_OK : this._text();
    }

    private setText(text: string): void {
        if(this._text() === undefined || this._text() === '') {
            this._text(text);
        } else {
            this._text(this._text() + '<br/>' + text);
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
        if (status === NagiosHostModel.STATUS_OK) {
            this.setCss(CssClasses.SUCCESS);
        }
        else if (status === NagiosHostModel.STATUS_CRITICAL) {
            this.setCss(CssClasses.FAILURE);
            this.setText(service.service_description);
        }
        else if (status === NagiosHostModel.STATUS_WARNING) {
            this.setCss(CssClasses.WARNING);
            this.setText(service.service_description);
        }
        else {
            this.setCss(CssClasses.DISABLED);
        }
    }

}

export = NagiosHostModel;