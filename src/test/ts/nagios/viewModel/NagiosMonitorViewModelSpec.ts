///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=Types
import Types = require('../../../../main/ts/util/Types'); ///ts:import:generated
///ts:import=NagiosMonitorViewModel
import NagiosMonitorViewModel = require('../../../../main/ts/nagios/viewModel/NagiosMonitorViewModel'); ///ts:import:generated
///ts:import=NagiosSpecDataProvider
import NagiosSpecDataProvider = require('../NagiosSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link NagiosMonitorViewModel}
 */
describe('NagiosMonitorViewModel', function(): void {

    var dataProvider: NagiosSpecDataProvider = new NagiosSpecDataProvider();

    var testling: NagiosMonitorViewModel = dataProvider.getNagiosMonitorViewModel();

    it('Test Methods', function(): void {
        expect(testling.getName()).toEqual(NagiosSpecDataProvider.NAME);
        expect(testling.getType()).toEqual(Types.NAGIOS);
        expect(testling.getModels().length).toBeGreaterThan(0);
    });

});
