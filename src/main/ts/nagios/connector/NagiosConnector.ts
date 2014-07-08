/// <reference path="../../vendor/jquery.d.ts" />
/// <reference path="../../jsonInterfaces/NagiosResponse.d.ts" />
import jQuery = require('jquery');
import NagiosJsonResponse = require('NagiosJsonResponse');
///ts:import=Connector
import Connector = require('../../connector/Connector'); ///ts:import:generated
///ts:import=ConnectorBase
import ConnectorBase = require('../../connector/ConnectorBase'); ///ts:import:generated
///ts:import=NagiosMonitorModel
import NagiosMonitorModel = require('../model/NagiosMonitorModel'); ///ts:import:generated

/**
 * Get data from Nagios {@link http://www.nagios.org/}
 */
class NagiosConnector extends ConnectorBase implements Connector {

    //the nagios host
    public static NAGIOS_PREFIX: string = '/cgi-bin/status-json.cgi?';
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

    private static NAGIOS_HOSTINFO_PREFIX = '/cgi-bin/extinfo.cgi?type=1&host=';

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getRemoteData(model:NagiosMonitorModel):void {
        jQuery.getJSON(this.getApiUrl(model),
            (json: NagiosJsonResponse.NagiosServices)=> {
                NagiosConnector.updateModel(json,model);
            }
        ).fail((jqXHR, textStatus, errorThrown) => {
            if(console) {
                console.log(jqXHR, textStatus, errorThrown, this.getApiUrl(model));
            }
        });

        //reload data periodically.
        setTimeout(() => this.getRemoteData(model), ConnectorBase.getRandomTimeout());
    }

    public static updateModel(json : NagiosJsonResponse.NagiosServices, model:NagiosMonitorModel):void {
        model.setData(json);
    }

    public getApiUrl(model:NagiosMonitorModel):string {
        return this.getUrl(model.getHostname(),
            NagiosConnector.NAGIOS_PREFIX +
                NagiosConnector.NAGIOS_HOST_SUFFIX +
                NagiosConnector.DISPLAY_ALL_HOSTS +
                NagiosConnector.NAGIOS_JSONP_SUFFIX);
    }

    public getHostInfoUrl(nagiosHostname:string,hostname:string):string {
        return this.getUrl(nagiosHostname, NagiosConnector.NAGIOS_HOSTINFO_PREFIX + hostname);
    }
}

export = NagiosConnector;