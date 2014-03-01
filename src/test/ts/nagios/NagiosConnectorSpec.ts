/// <reference path="../jasmine"/>
import Configuration = require('../../../main/ts/configuration/Configuration');
import MonitorModels = require('../../../main/ts/MonitorModels');
import NagiosMonitorModel = require('../../../main/ts/nagios/NagiosMonitorModel');
import NagiosConnector = require('../../../main/ts/nagios/NagiosConnector');
import NagiosJsonResponse = require('../../../main/ts/jsonInterfaces/NagiosResponse');
import ConnectorBase = require('../../../main/ts/connector/ConnectorBase');
import Config = require('../../../main/ts/jsonInterfaces/Config');

/**
 * Tests {@link Configuration}
 */
describe("NagiosConnector", function():void {

    var _HOST:string = "myhost";
    var _NAME:string = "mymonitor";
    var _ID:string = "myid,myid2";
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

    var monitor:NagiosMonitorModel = <NagiosMonitorModel>MonitorModels.createModel(monitorJson, configuration, _HOST);

    var testling = new NagiosConnector(configuration);

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling.getExpiry()).toBe(_EXPIRY);
        expect(NagiosConnector.getHostnames(monitor)[0]).toBe('myid');
        expect(NagiosConnector.getHostnames(monitor)[1]).toBe('myid2');
        expect(testling.getApiUrl(monitor)).toBe('https://myhost:8080/myprefix/nagios/cgi-bin/status-json.cgi?host=all&callback=?');
        expect(testling.getHostInfoUrl(NagiosConnector.getHostnames(monitor)[0],monitor.hostname)).toBe('http://myid/nagios/cgi-bin/extinfo.cgi?type=1&host=myhost');
    });

});