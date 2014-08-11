///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../../../../main/ts/travis/model/TravisMonitorModel'); ///ts:import:generated
///ts:import=TravisBoxViewModel
import TravisBoxViewModel = require('../../../../main/ts/travis/viewModel/TravisBoxViewModel'); ///ts:import:generated
///ts:import=TravisSpecDataProvider
import TravisSpecDataProvider = require('../TravisSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link TravisDetailsViewModel}
 */
describe('TravisBoxViewModel', function(): void {

    var dataProvider: TravisSpecDataProvider = new TravisSpecDataProvider();
    var model: TravisMonitorModel = dataProvider.getTravisMonitorModel();
    var testling: TravisBoxViewModel = new TravisBoxViewModel(model);

    it('Test methods without backend data', function(): void{
        expect(testling.getHtmlsafeId()).toBe(TravisSpecDataProvider.HTMLSAFE_REF);
        expect(testling.getName()).toBe(TravisSpecDataProvider.NAME);
        expect(testling.getStyle()).toEqual('opacity: 1');
        expect(testling.getBuildingStyle()).toBeUndefined();
        expect(testling.getCss()).toEqual(' jobstatus  alert ');
    });

    it('Test methods with backend data', function(): void {
        model.setData(TravisSpecDataProvider.JSON_RESPONSE);

        expect(testling.getHtmlsafeId()).toBe(TravisSpecDataProvider.HTMLSAFE_REF);
        expect(testling.getName()).toBe(TravisSpecDataProvider.NAME);
        expect(testling.getStyle()).toMatch('opacity: 0.99\\d+');
        expect(testling.getBuildingStyle()).toBeUndefined();
        expect(testling.getCss()).toEqual(' jobstatus  alert  alert-success ');
    });

});
