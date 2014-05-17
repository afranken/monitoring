import Types = require('../../../main/ts/util/Types');
import Config = require('../../../main/ts/jsonInterfaces/Config');
import Connectors = require('../../../main/ts/connector/Connectors');
import Configuration = require('../../../main/ts/configuration/Configuration');
import MonitorModels = require('../../../main/ts/model/MonitorModels');
import SonarMonitorModel = require('../../../main/ts/sonar/model/SonarMonitorModel');
import SonarMonitorViewModel = require('../../../main/ts/sonar/viewModel/SonarMonitorViewModel');
import SonarConnector = require('../../../main/ts/sonar/connector/SonarConnector');
import SonarJsonResponse = require('../../../main/ts/jsonInterfaces/SonarResponse.d');

class SonarSpecDataProvider {

    public static HOST: string = 'myhost';
    public static EXPIRY: number = 888;
    public static NAME = 'Team Bugfixes';
    public static REF_NAME_1 = 'project';
    public static REF_NAME_2 = 'project-base';
    public static REF_NAME_3 = 'project-tests';
    public static REF_ID_1 = '67592';
    public static REF_ID_2 = '67575';
    public static REF_ID_3 = '67829';

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

    public static JSON_RESPONSE: SonarJsonResponse.Json = {
            "id": 83044,
            "key": "com.coremedia.blueprint:cm7:master-7.0",
            "name": "CoreMedia Blueprint master-7.0",
            "scope": "PRJ",
            "qualifier": "BRC",
            "date": new Date(),
            "creationDate": "2014-02-13T09:33:17+0100",
            "lname": "CoreMedia Blueprint master-7.0",
            "version": "7.0.29-64",
            "branch": "master-7.0",
            "description": "",
            "msr": [
                {
                    "key": "blocker_violations",
                    "val": 0.0,
                    "frmt_val": "0"
                },
                {
                    "key": "critical_violations",
                    "val": 0.0,
                    "frmt_val": "0"
                },
                {
                    "key": "major_violations",
                    "val": 1554.0,
                    "frmt_val": "1,554"
                },
                {
                    "key": "minor_violations",
                    "val": 543.0,
                    "frmt_val": "543"
                },
                {
                    "key": "info_violations",
                    "val": 423.0,
                    "frmt_val": "423"
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
