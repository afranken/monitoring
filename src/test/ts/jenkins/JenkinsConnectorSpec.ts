/// <reference path="../jasmine"/>
import Configuration = require('../../../main/ts/configuration/Configuration');
import MonitorModels = require('../../../main/ts/MonitorModels');
import JenkinsMonitorModel = require('../../../main/ts/jenkins/JenkinsMonitorModel');
import JenkinsConnector = require('../../../main/ts/jenkins/JenkinsConnector');
import JenkinsJsonResponse = require('../../../main/ts/jsonInterfaces/JenkinsResponse');
import ConnectorBase = require('../../../main/ts/connector/ConnectorBase');
import Config = require('../../../main/ts/jsonInterfaces/Config');
import Types = require('../../../main/ts/Types');

/**
 * Tests {@link Configuration}
 */
describe("JenkinsConnector", function():void {

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

    var monitor:JenkinsMonitorModel = <JenkinsMonitorModel>MonitorModels.createModel(monitorJson, configuration, _HOST);

    var testling:JenkinsConnector = new JenkinsConnector(configuration);

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling.getExpiry()).toBe(_EXPIRY);
        expect(testling.getJobUrl(monitor)).toBe('https://myhost:8080/myprefix/job/myid');
        expect(testling.getApiUrl(monitor)).toBe('https://myhost:8080/myprefix/job/myid/api/json?jsonp=?&tree=name,url,displayName,color,lastBuild[timestamp,building,duration,estimatedDuration,url,result,number,id,failCount,skipCount,totalCount,actions[lastBuiltRevision[branch[SHA1,name]],failCount,skipCount,totalCount]]&depth=1');
    });

});