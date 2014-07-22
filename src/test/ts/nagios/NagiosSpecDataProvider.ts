///ts:ref=Config.d.ts
/// <reference path="../../../main/ts/jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:ref=NagiosResponse.d.ts
/// <reference path="../../../main/ts/jsonInterfaces/NagiosResponse.d.ts"/> ///ts:ref:generated
///ts:import=Types
import Types = require('../../../main/ts/util/Types'); ///ts:import:generated
///ts:import=Connectors
import Connectors = require('../../../main/ts/connector/Connectors'); ///ts:import:generated
///ts:import=Configuration
import Configuration = require('../../../main/ts/configuration/Configuration'); ///ts:import:generated
///ts:import=MonitorModels
import MonitorModels = require('../../../main/ts/model/MonitorModels'); ///ts:import:generated
///ts:import=NagiosMonitorModel
import NagiosMonitorModel = require('../../../main/ts/nagios/model/NagiosMonitorModel'); ///ts:import:generated
///ts:import=NagiosMonitorViewModel
import NagiosMonitorViewModel = require('../../../main/ts/nagios/viewModel/NagiosMonitorViewModel'); ///ts:import:generated
///ts:import=NagiosConnector
import NagiosConnector = require('../../../main/ts/nagios/connector/NagiosConnector'); ///ts:import:generated

import Config = require('Config');
import NagiosJsonResponse = require('NagiosJsonResponse');

class NagiosSpecDataProvider {

    public static HOST: string = 'myhost';
    public static NAME: string = 'mymonitor';
    public static ID: string = 'myid,myid2';
    public static EXPIRY: number = 888;
    public static HOSTNAME_1 = 'myname';
    public static HOSTNAME_2 = 'myname2';

    public configuration: Configuration = new Configuration({
         hosts : [
            {
                 hostname : NagiosSpecDataProvider.HOST,
                 protocol : 'https',
                 port : '8080',
                 prefix : 'myprefix'
            }
        ],
         expiry : NagiosSpecDataProvider.EXPIRY
    });
    public static MONITOR_JSON: Config.Monitor = {
         name : NagiosSpecDataProvider.NAME,
         externalRef : [
            {
                 name : NagiosSpecDataProvider.HOSTNAME_1,
                 externalId : 'myid'
            },
            {
                 name : NagiosSpecDataProvider.HOSTNAME_2,
                 externalId : 'myid2'
            }
        ],
         hostname : NagiosSpecDataProvider.HOST,
         type : Types.NAGIOS
    };

    public static JSON_RESPONSE: NagiosJsonResponse.NagiosServices = {
         services : [
            {
                 service_status : 'OK',
                 service_host : {
                     host_status : 2,
                     host_address : '1.1.1.1',
                     host_name : NagiosSpecDataProvider.HOSTNAME_1
                },
                 service_description : 'Connectivity',
                 service_plugin_output : 'PING OK &#45; Packet loss &#61; 0&#37;&#44; RTA &#61; 0&#46;42 ms'
            },
            {
                 service_status : 'WARNING',
                 service_host : {
                     host_status : 2,
                     host_address : '1.1.1.1',
                     host_name : NagiosSpecDataProvider.HOSTNAME_1
                },
                 service_description : 'MEMUSE',
                 service_plugin_output : 'WARNING: physical memory: Total: 16G - Used: 15.7G (98%) - Free: 321M (2%) > warning '
            },
            {
                 service_status : 'CRITICAL',
                 service_host : {
                     host_status : 2,
                     host_address : '1.1.1.1',
                     host_name : NagiosSpecDataProvider.HOSTNAME_2
                },
                 service_description : 'SSH',
                 service_plugin_output : 'CRITICAL - load average: 45.00, 45.00, 44.95'
            }
        ]
    };

    public getNagiosMonitorModel(): NagiosMonitorModel {
        return <NagiosMonitorModel>MonitorModels
            .createModel(NagiosSpecDataProvider.MONITOR_JSON, this.configuration, NagiosSpecDataProvider.HOST);
    }

    public getNagiosMonitorViewModel(): NagiosMonitorViewModel {
        return <NagiosMonitorViewModel>MonitorModels
            .createViewModel(NagiosSpecDataProvider.MONITOR_JSON, this.configuration, NagiosSpecDataProvider.HOST);
    }

    public getNagiosConnector(): NagiosConnector {
        return <NagiosConnector>Connectors.createConnector(this.configuration, Types.NAGIOS);
    }

}

export = NagiosSpecDataProvider;
