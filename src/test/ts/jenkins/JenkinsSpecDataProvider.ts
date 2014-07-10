///ts:ref=Config.d.ts
/// <reference path="../../../main/ts/jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:ref=JenkinsResponse.d.ts
/// <reference path="../../../main/ts/jsonInterfaces/JenkinsResponse.d.ts"/> ///ts:ref:generated
///ts:import=Configuration
import Configuration = require('../../../main/ts/configuration/Configuration'); ///ts:import:generated
///ts:import=MonitorModels
import MonitorModels = require('../../../main/ts/model/MonitorModels'); ///ts:import:generated
///ts:import=Connectors
import Connectors = require('../../../main/ts/connector/Connectors'); ///ts:import:generated
///ts:import=JenkinsMonitorModel
import JenkinsMonitorModel = require('../../../main/ts/jenkins/model/JenkinsMonitorModel'); ///ts:import:generated
///ts:import=JenkinsMonitorViewModel
import JenkinsMonitorViewModel = require('../../../main/ts/jenkins/viewModel/JenkinsMonitorViewModel'); ///ts:import:generated
///ts:import=JenkinsConnector
import JenkinsConnector = require('../../../main/ts/jenkins/connector/JenkinsConnector'); ///ts:import:generated
///ts:import=Types
import Types = require('../../../main/ts/util/Types'); ///ts:import:generated

import Config = require('Config');
import JenkinsJsonResponse = require('JenkinsJsonResponse');

class JenkinsSpecDataProvider {

    public static HOST:string = "myhost";
    public static NAME:string = "mymonitor";
    public static REF:string = "my.id$test";
    public static HTMLSAFE_REF:string = "my-id-test";
    public static EXPIRY:number = 888;
    public static ESTIMATED_DURATION:number = 2923735;
    public static TIMESTAMP:number = new Date().getTime();
    public static COLOR:string = "blue";
    public static DURATION:number = 2923735;
    public static BUILD_NUMBER:number = 209;
    public static URL:string = "http://hostname/job/name/209/";
    public static JOB_URL:string = "https://myhost:8080/myprefix/job/my.id$test";
    public static COMMIT_HASH:string = "00AAEEFF";
    public static BRANCH_NAME:string = "origin/master";

    public static MONITOR_JSON:Config.Monitor = {
        "name": JenkinsSpecDataProvider.NAME,
        "externalRef": JenkinsSpecDataProvider.REF,
        "hostname": JenkinsSpecDataProvider.HOST,
        "type": Types.JENKINS
    };

    public static LAST_BUILD_REVISION:JenkinsJsonResponse.Revision = {
        "branch": [
            {
                "SHA1": JenkinsSpecDataProvider.COMMIT_HASH,
                "name": JenkinsSpecDataProvider.BRANCH_NAME
            }
        ]
    };

    public static LAST_BUILD:JenkinsJsonResponse.LastBuild = {
        "actions": [
            {
                "lastBuiltRevision": JenkinsSpecDataProvider.LAST_BUILD_REVISION
            }
        ],
        "building": false,
        "duration": JenkinsSpecDataProvider.DURATION,
        "estimatedDuration": JenkinsSpecDataProvider.ESTIMATED_DURATION,
        "id": "2014-02-07_01-29-34",
        "number": JenkinsSpecDataProvider.BUILD_NUMBER,
        "result": "SUCCESS",
        "timestamp": JenkinsSpecDataProvider.TIMESTAMP,
        "url": JenkinsSpecDataProvider.URL
    };


    public static JSON_RESPONSE:JenkinsJsonResponse.Json = {
        "displayName": "displayName",
        "name": "name",
        "url": "http://hostname/job/name/",
        "color": JenkinsSpecDataProvider.COLOR,
        "lastBuild": JenkinsSpecDataProvider.LAST_BUILD
    };

    public configuration:Configuration = new Configuration({
        "hosts": [
            {
                "hostname": JenkinsSpecDataProvider.HOST,
                "protocol": "https",
                "port": "8080",
                "prefix": "myprefix"
            }
        ],
        "expiry": JenkinsSpecDataProvider.EXPIRY
    });

    public getJenkinsMonitorModel():JenkinsMonitorModel {
        return <JenkinsMonitorModel>MonitorModels.createModel(JenkinsSpecDataProvider.MONITOR_JSON, this.configuration, JenkinsSpecDataProvider.HOST);
    }

    public getJenkinsConnector():JenkinsConnector {
        return <JenkinsConnector>Connectors.createConnector(this.configuration, Types.JENKINS);
    }

    public getJenkinsMonitorViewModel():JenkinsMonitorViewModel {
        return <JenkinsMonitorViewModel>MonitorModels.createViewModel(JenkinsSpecDataProvider.MONITOR_JSON, this.configuration, JenkinsSpecDataProvider.HOST);
    }

}

export = JenkinsSpecDataProvider;