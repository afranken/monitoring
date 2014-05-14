/// <reference path="../jasmine"/>
import Configuration = require('../../../main/ts/configuration/Configuration');
import MonitorModels = require('../../../main/ts/monitorModel/MonitorModels');
import JenkinsMonitorModel = require('../../../main/ts/jenkins/model/JenkinsMonitorModel');
import JenkinsConnector = require('../../../main/ts/jenkins/connector/JenkinsConnector');
import JenkinsJsonResponse = require('../../../main/ts/jsonInterfaces/JenkinsResponse');
import ConnectorBase = require('../../../main/ts/connector/ConnectorBase');
import Config = require('../../../main/ts/jsonInterfaces/Config');
import Types = require('../../../main/ts/util/Types');
import CssClasses = require('../../../main/ts/util/CssClasses');

/**
 * Tests {@link Configuration}
 */
describe("JenkinsMonitorModel", function():void {

    var _HOST:string = "myhost";
    var _NAME:string = "mymonitor";
    var _REF:string = "my.id$test";
    var _HTMLSAFE_REF:string = "my-id-test";
    var _EXPIRY:number = 888;

    var configuration: Configuration = new Configuration({
        "hosts": [
            {
                "hostname": _HOST,
                "protocol": "https",
                "port": "8080",
                "prefix": "myprefix"
            }
        ],
        "expiry": _EXPIRY
    });


    var monitorJson: Config.Monitor = {
        "name": _NAME,
        "externalRef": _REF,
        "hostname": _HOST,
        "type": Types.JENKINS
    };

    var _ESTIMATED_DURATION = 2923735;
    var _TIMESTAMP = 1391732974152;
    var _COLOR = "blue";
    var _DURATION = 2923735;
    var _BUILD_NUMBER = 209;
    var _URL = "http://hostname/job/name/209/";
    var _COMMIT_HASH = "00AAEEFF";
    var _BRANCH_NAME = "origin/master";

    var _LAST_BUILD_REVISION:JenkinsJsonResponse.Revision = {
        "branch": [
            {
                "SHA1": _COMMIT_HASH,
                "name": _BRANCH_NAME
            }
        ]
    };

    var _LAST_BUILD:JenkinsJsonResponse.LastBuild = {
        "actions": [
            {
                "lastBuiltRevision": _LAST_BUILD_REVISION
            }
        ],
        "building": false,
        "duration": _DURATION,
        "estimatedDuration": _ESTIMATED_DURATION,
        "id":"2014-02-07_01-29-34",
        "number": _BUILD_NUMBER,
        "result": "SUCCESS",
        "timestamp": _TIMESTAMP,
        "url": _URL
    };


    var jsonResponse: JenkinsJsonResponse.Json = {
        "displayName": "displayName",
        "name": "name",
        "url": "http://hostname/job/name/",
        "color": _COLOR,
        "lastBuild": _LAST_BUILD
    };

    var testling:JenkinsMonitorModel = <JenkinsMonitorModel>MonitorModels.createModel(monitorJson, configuration, _HOST);


    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling.getHostname()).toBe(_HOST);
        expect(testling.getName()).toBe(_NAME);
        expect(testling.getExternalRef()).toBe(_REF);
        expect(testling.getExpiry()).toBe(_EXPIRY);
        expect(testling.getHtmlsafeId()).toBe(_HTMLSAFE_REF);

        expect(testling.getLastBuild()).toBeUndefined();
        expect(testling.getLastBuiltRevision()).toBeUndefined();
        expect(testling.getResponseColor()).toBeUndefined();
        expect(testling.getResponseTimestamp()).toBeUndefined();
        expect(testling.getEstimatedDuration()).toBeUndefined();
        expect(testling.getDuration()).toBeUndefined();
        expect(testling.getBuildNumber()).toBeUndefined();
        expect(testling.getLastBuildUrl()).toBeUndefined();
        expect(testling.getLastBuildCommitHash()).toBeUndefined();
        expect(testling.getLastBuildBranchName()).toBeUndefined();
    });

    it("TestMethodsAfterResponse", function():void {
        testling.setData(jsonResponse);

        expect(testling.getHostname()).toBe(_HOST);
        expect(testling.getName()).toBe(_NAME);
        expect(testling.getExternalRef()).toBe(_REF);
        expect(testling.getExpiry()).toBe(_EXPIRY);
        expect(testling.getHtmlsafeId()).toBe(_HTMLSAFE_REF);

        expect(testling.getLastBuild()).toBe(_LAST_BUILD);
        expect(testling.getLastBuiltRevision()).toBe(_LAST_BUILD_REVISION);
        expect(testling.getResponseColor()).toBe(_COLOR);
        expect(testling.getResponseTimestamp()).toBe(_TIMESTAMP);
        expect(testling.getEstimatedDuration()).toBe(_ESTIMATED_DURATION);
        expect(testling.getDuration()).toBe(_DURATION);
        expect(testling.getBuildNumber()).toBe(_BUILD_NUMBER);
        expect(testling.getLastBuildUrl()).toBe(_URL);
        expect(testling.getLastBuildCommitHash()).toBe(_COMMIT_HASH);
        expect(testling.getLastBuildBranchName()).toBe(_BRANCH_NAME);
    });

});