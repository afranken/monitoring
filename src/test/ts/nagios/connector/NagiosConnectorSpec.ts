/// <reference path='../../jasmine.d'/>
/// <reference path='../../reference'/>
///ts:import=NagiosMonitorModel
import NagiosMonitorModel = require('../../../../main/ts/nagios/model/NagiosMonitorModel'); ///ts:import:generated
///ts:import=NagiosConnector
import NagiosConnector = require('../../../../main/ts/nagios/connector/NagiosConnector'); ///ts:import:generated
///ts:import=NagiosSpecDataProvider
import NagiosSpecDataProvider = require('../NagiosSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link NagiosConnector}
 */
describe("NagiosConnector", function():void {

    var dataProvider:NagiosSpecDataProvider = new NagiosSpecDataProvider();
    var monitor:NagiosMonitorModel = dataProvider.getNagiosMonitorModel();
    var testling:NagiosConnector = dataProvider.getNagiosConnector();

    /**
     * Test all methods
     */
    it("Test Methods", function():void {
        expect(testling.getExpiry()).toBe(NagiosSpecDataProvider.EXPIRY);
        expect(testling.getApiUrl(monitor)).toBe('https://myhost:8080/myprefix/cgi-bin/status-json.cgi?host=all&callback=?');
        expect(testling.getHostInfoUrl(monitor.getHostname(),"myid")).toBe('https://myhost:8080/myprefix/cgi-bin/extinfo.cgi?type=1&host=myid');
    });

});