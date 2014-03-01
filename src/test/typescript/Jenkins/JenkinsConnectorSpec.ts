/// <reference path="../jasmine"/>
import Configuration = require('../../../main/typescript/Configuration/Configuration');
import MonitorModels = require('../../../main/typescript/MonitorModels');
import JenkinsMonitorModel = require('../../../main/typescript/Jenkins/JenkinsMonitorModel');
import JenkinsConnector = require('../../../main/typescript/Jenkins/JenkinsConnector');
import JenkinsJsonResponse = require('../../../main/typescript/JsonInterfaces/JenkinsResponse');
import ConnectorBase = require('../../../main/typescript/Connector/ConnectorBase');
import Config = require('../../../main/typescript/JsonInterfaces/Config');

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
        "hostname": _HOST
    };

    var monitor:JenkinsMonitorModel = <JenkinsMonitorModel>MonitorModels.createModel(monitorJson, configuration, _HOST);

    var testling = new JenkinsConnector(configuration);

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling.getExpiry()).toBe(_EXPIRY);
        expect(testling.getJobUrl(monitor)).toBe('https://myhost:8080/myprefix/job/myid');
        expect(testling.getApiUrl(monitor)).toBe('https://myhost:8080/myprefix/job/myid/api/json?jsonp=?&tree=name,url,displayName,color,lastBuild[timestamp,building,duration,url,result,number,id,failCount,skipCount,totalCount,actions[lastBuiltRevision[branch[SHA1,name]]]]&depth=1');
    });

});