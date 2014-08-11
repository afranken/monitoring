///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=Types
import Types = require('../../../../main/ts/util/Types'); ///ts:import:generated
///ts:import=TravisMonitorViewModel
import TravisMonitorViewModel = require('../../../../main/ts/travis/viewModel/TravisMonitorViewModel'); ///ts:import:generated
///ts:import=TravisDetailsViewModel
import TravisDetailsViewModel = require('../../../../main/ts/travis/viewModel/TravisDetailsViewModel'); ///ts:import:generated
///ts:import=TravisSpecDataProvider
import TravisSpecDataProvider = require('../TravisSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link TravisMonitorViewModel}
 */
describe('TravisMonitorViewModel', function(): void {

    var dataProvider: TravisSpecDataProvider = new TravisSpecDataProvider();
    var testling: TravisMonitorViewModel = dataProvider.getTravisMonitorViewModel();

    it('Test methods', function(): void{
        expect(testling.getBox()).toBeDefined();
        expect(testling.getDetails()).toBeDefined();
        expect(testling.getHtmlsafeId()).toEqual(TravisSpecDataProvider.HTMLSAFE_REF);
        expect(testling.getType()).toEqual(Types.TRAVIS);
    });

});
