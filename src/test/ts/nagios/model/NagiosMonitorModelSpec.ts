///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=CssClasses
import CssClasses = require('../../../../main/ts/util/CssClasses'); ///ts:import:generated
///ts:import=NagiosMonitorModel
import NagiosMonitorModel = require('../../../../main/ts/nagios/model/NagiosMonitorModel'); ///ts:import:generated
///ts:import=NagiosSpecDataProvider
import NagiosSpecDataProvider = require('../NagiosSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link NagiosMonitorModel}
 */
describe("NagiosMonitorModel", function():void {

    var dataProvider:NagiosSpecDataProvider = new NagiosSpecDataProvider();

    var testling:NagiosMonitorModel = dataProvider.getNagiosMonitorModel();


    it("Test Base Methods", function():void {
        expect(testling.getName()).toEqual(NagiosSpecDataProvider.NAME);
        expect(testling.getHostname()).toEqual(NagiosSpecDataProvider.HOST);
        expect(testling.getHostnames()).toEqual([NagiosSpecDataProvider.HOSTNAME_1,NagiosSpecDataProvider.HOSTNAME_2]);
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_1).getName()).toEqual(NagiosSpecDataProvider.HOSTNAME_1);
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_2).getName()).toEqual(NagiosSpecDataProvider.HOSTNAME_2);
    });

    it("Test HostModel creation", function():void {
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_1).getName()).toEqual(NagiosSpecDataProvider.HOSTNAME_1);
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_2).getName()).toEqual(NagiosSpecDataProvider.HOSTNAME_2);
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_1).getAllServices()).toEqual([]);
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_2).getAllServices()).toEqual([]);
    });

    it("Test setting data on HostModels", function():void {
        //set data twice to test if data is reset (otherwise, all services would be duplicated)
        testling.setData(NagiosSpecDataProvider.JSON_RESPONSE);
        testling.setData(NagiosSpecDataProvider.JSON_RESPONSE);
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_1).getAllServices()).toEqual([ 'Connectivity', 'MEMUSE' ]);
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_1).getBrokenServices()).toEqual([ 'MEMUSE' ]);
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_2).getAllServices()).toEqual([ 'SSH' ]);
        expect(testling.getHostModel(NagiosSpecDataProvider.HOSTNAME_2).getBrokenServices()).toEqual([ 'SSH' ]);
    });


});