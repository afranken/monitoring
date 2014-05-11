/// <reference path="../vendor/knockout.d.ts" />
/// <reference path="../vendor/jquery.d.ts" />
import jQuery = require('jquery');
import ko = require('knockout');
import CssClasses = require('../util/CssClasses');
import NagiosJsonResponse = require('../jsonInterfaces/NagiosResponse');
import MonitorModels = require('../monitorModel/MonitorModels');

/**
 * Model that represents one Nagios host with all services
 */
class NagiosHostModel {

    /**
     * Service status returned from Nagios
     */
    public static STATUS_OK: string = 'OK';
    public static STATUS_WARNING: string = 'WARNING';
    public static STATUS_CRITICAL: string = 'CRITICAL';

    private _name:string;
    private _hostname:string;
    private _url:string;
    private _allServices:KnockoutObservableArray<string> = ko.observableArray<string>();
    private _brokenServices:KnockoutObservableArray<string> = ko.observableArray<string>();
    private _css:KnockoutObservable<string> = ko.observable<string>();

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(name:string,hostname:string, url:string) {
        this._name = name;
        this._css(CssClasses.BASIC_CLASSES);
        this._url = url;
        this._hostname = hostname;
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getName():string {
        return this._name;
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

    public getBrokenServices(): Array<string> {
        return this._brokenServices();
    }

    public getAllServices(): Array<string> {
        return this._allServices();
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    /**
     * Reset current host/service status.
     */
    public resetData():void {
        this._css(CssClasses.BASIC_CLASSES);
        this._allServices.removeAll();
        this._brokenServices.removeAll();
    }

    public addService(service: NagiosJsonResponse.NagiosService){
        var status = service.service_status;
        this.setAllServices(service.service_description);
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

    //==================================================================================================================
    // Private
    //==================================================================================================================

    private setBrokenServices(service: string): void {
        if(!~jQuery.inArray(service,this._brokenServices())) {
            this._brokenServices.push(service);
        }
    }

    private setAllServices(service: string): void {
        if(!~jQuery.inArray(service,this._allServices())) {
            this._allServices.push(service);
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

}

export = NagiosHostModel;