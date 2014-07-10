///ts:ref=SonarResponse.d.ts
/// <reference path="../../../main/ts/jsonInterfaces/SonarResponse.d.ts"/> ///ts:ref:generated
///ts:ref=Config.d.ts
/// <reference path="../../../main/ts/jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:import=Types
import Types = require('../../../main/ts/util/Types'); ///ts:import:generated
///ts:import=Connectors
import Connectors = require('../../../main/ts/connector/Connectors'); ///ts:import:generated
///ts:import=Configuration
import Configuration = require('../../../main/ts/configuration/Configuration'); ///ts:import:generated
///ts:import=MonitorModels
import MonitorModels = require('../../../main/ts/model/MonitorModels'); ///ts:import:generated
///ts:import=SonarMonitorModel
import SonarMonitorModel = require('../../../main/ts/sonar/model/SonarMonitorModel'); ///ts:import:generated
///ts:import=SonarModuleModel
import SonarModuleModel = require('../../../main/ts/sonar/model/SonarModuleModel'); ///ts:import:generated
///ts:import=SonarViolationModel
import SonarViolationModel = require('../../../main/ts/sonar/model/SonarViolationModel'); ///ts:import:generated
///ts:import=SonarMonitorViewModel
import SonarMonitorViewModel = require('../../../main/ts/sonar/viewModel/SonarMonitorViewModel'); ///ts:import:generated
///ts:import=SonarConnector
import SonarConnector = require('../../../main/ts/sonar/connector/SonarConnector'); ///ts:import:generated

import Config = require('Config');
import SonarJsonResponse = require('SonarJsonResponse');

class SonarSpecDataProvider {

    public static HOST: string = 'myhost';
    public static EXPIRY: number = 888;
    public static NAME: string  = 'Team Bugfixes';
    public static REF_NAME_1: string  = 'project';
    public static REF_NAME_2: string  = 'project-base';
    public static REF_NAME_3: string  = 'project-tests';
    public static REF_ID_1: string = '67592';
    public static REF_ID_2: string  = '67575';
    public static REF_ID_3: string  = '67829';
    public static COUNT_BLOCKER: number = 0;
    public static COUNT_CRITICAL: number = 0;
    public static COUNT_MAJOR: number = 1554;
    public static COUNT_MINOR: number = 543;
    public static COUNT_INFO: number = 423;

    public configuration: Configuration = new Configuration({
        hosts: [
            {
                hostname: SonarSpecDataProvider.HOST,
                protocol: 'https',
                port: '8080',
                prefix: 'myprefix'
            }
        ],
        expiry: SonarSpecDataProvider.EXPIRY
    });

    public static MONITOR_JSON: Config.Monitor = {
        name: SonarSpecDataProvider.NAME,
        type: Types.SONAR,
        externalRef: [
            {
                name: SonarSpecDataProvider.REF_NAME_1,
                id: SonarSpecDataProvider.REF_ID_1
            },
            {
                name: SonarSpecDataProvider.REF_NAME_2,
                id: SonarSpecDataProvider.REF_ID_2
            },
            {
                name: SonarSpecDataProvider.REF_NAME_3,
                id: SonarSpecDataProvider.REF_ID_3
            }
        ]
    };

    public static JSON_RESPONSE: SonarJsonResponse.Json =
        {
            id: parseInt(SonarSpecDataProvider.REF_ID_1),
            name: 'CoreMedia Blueprint master-7.0',
            date: new Date(),
            msr: [
                {
                    key: 'blocker_violations',
                    val: SonarSpecDataProvider.COUNT_BLOCKER,
                    frmt_val: '0'
                },
                {
                    key: 'critical_violations',
                    val: SonarSpecDataProvider.COUNT_CRITICAL,
                    frmt_val: '0'
                },
                {
                    key: 'major_violations',
                    val: SonarSpecDataProvider.COUNT_MAJOR,
                    frmt_val: '1,554'
                },
                {
                    key: 'minor_violations',
                    val: SonarSpecDataProvider.COUNT_MINOR,
                    frmt_val: '543'
                },
                {
                    key: 'info_violations',
                    val: SonarSpecDataProvider.COUNT_INFO,
                    frmt_val: '423'
                }
            ]
        };

    public getSonarMonitorModel(): SonarMonitorModel {
        return <SonarMonitorModel>MonitorModels
            .createModel(SonarSpecDataProvider.MONITOR_JSON, this.configuration, SonarSpecDataProvider.HOST);
    }

    public getSonarMonitorViewModel(): SonarMonitorViewModel {
        return <SonarMonitorViewModel>MonitorModels
            .createViewModel(SonarSpecDataProvider.MONITOR_JSON, this.configuration, SonarSpecDataProvider.HOST);
    }

    public getSonarConnector(): SonarConnector {
        return <SonarConnector>Connectors.createConnector(this.configuration, Types.SONAR);
    }

}

export = SonarSpecDataProvider;
