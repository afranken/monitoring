///ts:ref=Config.d.ts
/// <reference path="../../../main/ts/jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:ref=TravisResponse.d.ts
/// <reference path="../../../main/ts/jsonInterfaces/TravisResponse.d.ts"/> ///ts:ref:generated
///ts:import=Configuration
import Configuration = require('../../../main/ts/configuration/Configuration'); ///ts:import:generated
///ts:import=MonitorModels
import MonitorModels = require('../../../main/ts/model/MonitorModels'); ///ts:import:generated
///ts:import=Connectors
import Connectors = require('../../../main/ts/connector/Connectors'); ///ts:import:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../../../main/ts/travis/model/TravisMonitorModel'); ///ts:import:generated
///ts:import=TravisMonitorViewModel
import TravisMonitorViewModel = require('../../../main/ts/travis/viewModel/TravisMonitorViewModel'); ///ts:import:generated
///ts:import=TravisConnector
import TravisConnector = require('../../../main/ts/travis/connector/TravisConnector'); ///ts:import:generated
///ts:import=Types
import Types = require('../../../main/ts/util/Types'); ///ts:import:generated

import Config = require('Config');
import TravisJsonResponse = require('TravisJsonResponse');

class TravisSpecDataProvider {

    public static HOST: string = 'myhost';
    public static NAME: string = 'mymonitor';
    public static REF: string = 'my.id$test';
    public static HTMLSAFE_REF: string = 'my-id-test';
    public static EXPIRY: number = 888;
    public static ESTIMATED_DURATION: number = 2923735;
    public static DATE: Date = new Date();
    public static TIMESTAMP: number = TravisSpecDataProvider.DATE.getTime();
    public static COLOR: number = 0;
    public static DURATION: number = 137;
    public static BUILD_NUMBER: string = '209';
    public static BUILD_ID = 29644852;
    public static JOB_URL: string = 'https://myhost:8080/myprefix/my.id$test';
    public static BUILD_URL: string = 'https://myhost:8080/myprefix/my.id$test/builds/29644852';
    public static URL: string = 'https://api.myhost:8080/myprefix/repositories/my.id$test';
    public static COMMIT_HASH: string = '00AAEEFF';
    public static BRANCH_NAME: string = 'origin/master';

    public static MONITOR_JSON: Config.Monitor = {
        name: TravisSpecDataProvider.NAME,
        externalRef: TravisSpecDataProvider.REF,
        hostname: TravisSpecDataProvider.HOST,
        type: Types.TRAVIS
    };


    public static JSON_RESPONSE: TravisJsonResponse.Json[] = [{
            id: TravisSpecDataProvider.BUILD_ID,
            repository_id: 1982068,
            number: TravisSpecDataProvider.BUILD_NUMBER,
            state: 'finished',
            result: TravisSpecDataProvider.COLOR,
            started_at: TravisSpecDataProvider.DATE,
            finished_at: TravisSpecDataProvider.DATE,
            duration: TravisSpecDataProvider.DURATION,
            commit: TravisSpecDataProvider.COMMIT_HASH,
            branch: TravisSpecDataProvider.BRANCH_NAME,
            message: 'reference file not needed any more.',
            event_type: 'push'
        }];

    public configuration: Configuration = new Configuration({
        hosts: [
            {
                hostname: TravisSpecDataProvider.HOST,
                protocol: 'https',
                port: '8080',
                prefix: 'myprefix'
            }
        ],
        expiry: TravisSpecDataProvider.EXPIRY
    });

    public getTravisMonitorModel(): TravisMonitorModel {
        return <TravisMonitorModel>MonitorModels
            .createModel(TravisSpecDataProvider.MONITOR_JSON, this.configuration, TravisSpecDataProvider.HOST);
    }

    public getTravisConnector(): TravisConnector {
        return <TravisConnector>Connectors.createConnector(this.configuration, Types.TRAVIS);
    }

    public getTravisMonitorViewModel(): TravisMonitorViewModel {
        return <TravisMonitorViewModel>MonitorModels
            .createViewModel(TravisSpecDataProvider.MONITOR_JSON, this.configuration, TravisSpecDataProvider.HOST);
    }

}

export = TravisSpecDataProvider;
