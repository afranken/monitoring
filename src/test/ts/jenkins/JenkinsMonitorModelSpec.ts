/// <reference path="../jasmine"/>
import Configuration = require('../../../main/ts/configuration/Configuration');
import MonitorModels = require('../../../main/ts/MonitorModels');
import JenkinsMonitorModel = require('../../../main/ts/jenkins/JenkinsMonitorModel');
import JenkinsConnector = require('../../../main/ts/jenkins/JenkinsConnector');
import JenkinsJsonResponse = require('../../../main/ts/jsonInterfaces/JenkinsResponse');
import ConnectorBase = require('../../../main/ts/connector/ConnectorBase');
import Config = require('../../../main/ts/jsonInterfaces/Config');
import Types = require('../../../main/ts/Types');
import CssClasses = require('../../../main/ts/CssClasses');

/**
 * Tests {@link Configuration}
 */
describe("JenkinsMonitorModel", function():void {

    var _HOST:string = "myhost";
    var _NAME:string = "mymonitor";
    var _ID:string = "myid";
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
            "id":"2014-02-07_01-29-34",
            "number":209,
            "result": "SUCCESS",
            "timestamp": 1391732974152,
            "url": "http://hostname/job/name/209/"
        }
    };

    var testling:JenkinsMonitorModel = <JenkinsMonitorModel>MonitorModels.createModel(monitorJson, configuration, _HOST);


    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling.getHostname()).toBe(_HOST);
        expect(testling.getName()).toBe(_NAME);
        expect(testling.getId()).toBe(_ID);
        expect(testling.getCss()).toBe(CssClasses.BASIC_CLASSES);
        expect(testling.getStyle()).toBe("opacity: 1");
        expect(testling.getType()).toBe(Types.JENKINS);
        expect(testling.getUrl()).toBe("https://myhost:8080/myprefix/job/myid");
    });

    it("TestMethodsAfterResponse", function():void {
        testling.setData(jsonResponse);
        expect(testling.getCss()).toBe(CssClasses.BASIC_CLASSES+CssClasses.SUCCESS);
        expect(testling.getStyle()).toMatch("opacity: 0.\\d+");
    });

});