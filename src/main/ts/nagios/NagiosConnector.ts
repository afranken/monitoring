/// <reference path="../vendor/jquery.d.ts" />
import jQuery = require('jquery');
import Connector = require('../connector/Connector');
import ConnectorBase = require('../connector/ConnectorBase');
import MonitorModel = require('../MonitorModel');
import NagiosJsonResponse = require('../jsonInterfaces/NagiosResponse');
import Configuration = require('../configuration/Configuration');
import NagiosMonitorModel = require('./NagiosMonitorModel');

class NagiosConnector extends ConnectorBase implements Connector {

    //the nagios host
    public static NAGIOS_PREFIX: string = '/nagios/cgi-bin/status-json.cgi?';
    //suffix used to access json output by host
    public static NAGIOS_HOST_SUFFIX: string = 'host=';
    //suffix used to access JSON output by host group
    public static NAGIOS_HOSTGROUP_SUFFIX: string = 'hostgroup=';
    //key to pass to nagios if data for all hosts should be displayed
    public static DISPLAY_ALL_HOSTS: string = 'all';
    //suffix to tell nagios to send all service information for a hostgroup
    public static SHOW_SERVICE_DETAILS: string = '&style=detail';
    //suffix to add to a JSON call to make jQuery automatically use JSONP
    public static NAGIOS_JSONP_SUFFIX: string = '&callback=?';

    private static NAGIOS_HOSTINFO_PREFIX = '/nagios/cgi-bin/extinfo.cgi?type=1&host=';

    public getRemoteData(model:NagiosMonitorModel):void {
        jQuery.getJSON(this.getApiUrl(model),
            (json: NagiosJsonResponse.NagiosServices)=> {
                this.updateModel(json,model);
            }
        );
    }

    public updateModel(json : NagiosJsonResponse.NagiosServices, model:NagiosMonitorModel):void {
        //--------- iterate over JSON response, save services that should be displayed
        json.services.forEach((service:NagiosJsonResponse.NagiosService)=>{
            if(service.service_host !== undefined && service.service_host.host_name !== undefined) {
                if(~NagiosConnector.getHostnames(model).indexOf(service.service_host.host_name)) {
                    model.addService(service.service_host.host_name,service);
                }
            }
        });
    }

    public getApiUrl(model:NagiosMonitorModel):string {
        return this.getUrl(model.hostname,
            NagiosConnector.NAGIOS_PREFIX +
                NagiosConnector.NAGIOS_HOST_SUFFIX +
                NagiosConnector.DISPLAY_ALL_HOSTS +
                NagiosConnector.NAGIOS_JSONP_SUFFIX);
    }

    public static getHostnames(model:NagiosMonitorModel):Array<string> {
        return model.id.split(',');
    }

    public getHostInfoUrl(nagiosHostname:string,hostname:string):string {
        return this.getUrl(nagiosHostname, NagiosConnector.NAGIOS_HOSTINFO_PREFIX + hostname);
    }
}

export = NagiosConnector;