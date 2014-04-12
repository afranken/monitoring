/// <reference path="../jasmine"/>
import Configuration = require('../../../main/ts/configuration/Configuration');
import MonitorModels = require('../../../main/ts/monitorModel/MonitorModels');
import NagiosMonitorModel = require('../../../main/ts/nagios/NagiosMonitorModel');
import NagiosConnector = require('../../../main/ts/nagios/NagiosConnector');
import NagiosJsonResponse = require('../../../main/ts/jsonInterfaces/NagiosResponse');
import ConnectorBase = require('../../../main/ts/connector/ConnectorBase');
import Config = require('../../../main/ts/jsonInterfaces/Config');
import Types = require('../../../main/ts/Types');

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
        "externalRef": [
            {
                "name": "myname",
                "externalId": "myid"
            },
            {
                "name": "myname2",
                "externalId": "myid2"
            }
        ],
        "hostname": _HOST,
        "type": Types.NAGIOS
    };

    var monitor:NagiosMonitorModel = <NagiosMonitorModel>MonitorModels.createModel(monitorJson, configuration, _HOST);

    var testling:NagiosConnector = new NagiosConnector(configuration);

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling.getExpiry()).toBe(_EXPIRY);
        expect(testling.getApiUrl(monitor)).toBe('https://myhost:8080/myprefix/cgi-bin/status-json.cgi?host=all&callback=?');
        expect(testling.getHostInfoUrl(monitor.getHostname(),"myid")).toBe('https://myhost:8080/myprefix/cgi-bin/extinfo.cgi?type=1&host=myid');
    });

});