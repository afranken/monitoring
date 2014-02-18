/// <reference path="../vendor/jquery.d.ts" />
import jQuery = require('jquery');
import Connector = require('../Connector')
import MonitorModel = require('../MonitorModel');
import NagiosJsonResponse = require('../JsonInterfaces/NagiosResponse');
import Configuration = require('../Configuration/Configuration');
import NagiosMonitorModel = require('./NagiosMonitorModel');

class NagiosConnector implements Connector {

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

    constructor(private configuration: Configuration) {}

    public getJson(id:string, hostname:string, model:NagiosMonitorModel):void {
        var hostnames: string[] = id.split(',');
        var apiUrl: string =
            this.configuration.getProtocol(hostname) +
                hostname +
                NagiosConnector.NAGIOS_PREFIX +
                NagiosConnector.NAGIOS_HOST_SUFFIX +
                NagiosConnector.DISPLAY_ALL_HOSTS +
                NagiosConnector.NAGIOS_JSONP_SUFFIX;
        jQuery.getJSON(apiUrl,function(json: NagiosJsonResponse.NagiosServices) {

            //--------- iterate over JSON response, save services that should be displayed
            json.services.forEach((service:NagiosJsonResponse.NagiosService)=>{
                if(service.service_host !== undefined && service.service_host.host_name !== undefined) {
                    if(hostnames.indexOf(service.service_host.host_name) > -1) {
                        model.addService(service.service_host.host_name,service);
                    }
                }
            });
        });
    }

    public getHostInfoUrl(nagiosHostname:string,hostname:string):string {
        return this.configuration.getProtocol(nagiosHostname) +
            nagiosHostname +
            NagiosConnector.NAGIOS_HOSTINFO_PREFIX +
            hostname;
    }
}

export = NagiosConnector;