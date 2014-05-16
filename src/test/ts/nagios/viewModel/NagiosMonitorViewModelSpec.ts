/// <reference path='../../jasmine.d'/>
import Types = require('../../../../main/ts/util/Types');
import NagiosMonitorViewModel = require('../../../../main/ts/nagios/viewModel/NagiosMonitorViewModel');
import NagiosJsonResponse = require('../../../../main/ts/jsonInterfaces/NagiosResponse');
import NagiosSpecDataProvider = require('../NagiosSpecDataProvider');

/**
 * Tests {@link NagiosMonitorViewModel}
 */
describe('NagiosMonitorViewModel', function():void {

    var dataProvider: NagiosSpecDataProvider = new NagiosSpecDataProvider();

    var testling: NagiosMonitorViewModel = dataProvider.getNagiosMonitorViewModel();

    it('Test Methods', function(): void {
        expect(testling.getName()).toEqual(NagiosSpecDataProvider.NAME);
        expect(testling.getType()).toEqual(Types.NAGIOS);
        expect(testling.getModels().length).toBeGreaterThan(0);
    });

});
