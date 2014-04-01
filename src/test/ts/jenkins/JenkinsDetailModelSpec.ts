/// <reference path="../jasmine"/>
import Configuration = require('../../../main/ts/configuration/Configuration');
import MonitorModels = require('../../../main/ts/monitorModel/MonitorModels');
import JenkinsDetailsModel = require('../../../main/ts/jenkins/JenkinsDetailsModel');
import JenkinsConnector = require('../../../main/ts/jenkins/JenkinsConnector');
import JenkinsJsonResponse = require('../../../main/ts/jsonInterfaces/JenkinsResponse');
import ConnectorBase = require('../../../main/ts/connector/ConnectorBase');
import Config = require('../../../main/ts/jsonInterfaces/Config');
import Types = require('../../../main/ts/Types');
import CssClasses = require('../../../main/ts/CssClasses');

/**
 * Tests {@link Configuration}
 */
describe("JenkinsDetailsModel", function():void {

    var _HOST:string = "myhost";
    var _NAME:string = "mymonitor";
    var _URL:string = "http://myurl/";
    var _ID:string = "myid";
    var _EXPIRY:number = 888;
    var _DATE:number = new Date().getTime();

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
        "id": _ID,
        "hostname": _HOST,
        "type": Types.JENKINS
    };

    var jsonResponse: JenkinsJsonResponse.Json = {
        "displayName": "displayName",
        "name": "name",
        "url": "http://hostname/job/name/",
        "color": "blue",
        "lastBuild": {
            "actions": [
                {
                    "lastBuiltRevision": {
                        "branch": [
                            {
                                "SHA1": "00AAEEFF",
                                "name": "origin/master"
                            }
                        ]
                    }
                }
            ],
            "building": false,
            "duration": 2923735,
            "estimatedDuration": 2923735,
            "id":"2014-02-07_01-29-34",
            "number":209,
            "result": "SUCCESS",
            "timestamp": _DATE,
            "url": "http://hostname/job/name/209/"
        }
    };

    var testling:JenkinsDetailsModel = new JenkinsDetailsModel(_URL,_NAME);


    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling.getName()).toBe(_NAME);
        expect(testling.getUrl()).toBe(_URL);
        expect(testling.getCommitHash()).toBeUndefined();
        expect(testling.getBranchName()).toBeUndefined();
        expect(testling.getRunTime()).toBeUndefined();
        expect(testling.getBuildNumber()).toBeUndefined();
        expect(testling.getBuildNumberUrl()).toBeUndefined();
        expect(testling.getStartDate()).toBeUndefined();
    });

    it("TestMethodsAfterResponse", function():void {
        testling.setData(jsonResponse);
        expect(testling.getName()).toBe(_NAME);
        expect(testling.getUrl()).toBe(_URL);
        expect(testling.getCommitHash()).toEqual("00AAEEFF");
        expect(testling.getBranchName()).toEqual("origin/master");
        expect(testling.getRunTime()).toEqual("an hour");
        expect(testling.getBuildNumber()).toEqual(209);
        expect(testling.getBuildNumberUrl()).toEqual("http://hostname/job/name/209/");
        expect(testling.getStartDate()).toEqual("a few seconds ago");
    });

});