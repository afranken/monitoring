///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../../../../main/ts/travis/model/TravisMonitorModel'); ///ts:import:generated
///ts:import=TravisConnector
import TravisConnector = require('../../../../main/ts/travis/connector/TravisConnector'); ///ts:import:generated
///ts:import=TravisSpecDataProvider
import TravisSpecDataProvider = require('../TravisSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link TravisConnector}
 */
describe('TravisConnector', function(): void {

    var dataProvider: TravisSpecDataProvider = new TravisSpecDataProvider();
    var model: TravisMonitorModel = dataProvider.getTravisMonitorModel();
    var testling: TravisConnector = dataProvider.getTravisConnector();

    /**
     * Test all methods
     */
    it('Test Methods', function(): void {
        expect(testling.getExpiry()).toBe(TravisSpecDataProvider.EXPIRY);
        expect(testling.getJobUrl(model)).toBe(TravisSpecDataProvider.JOB_URL);
        expect(testling.getApiUrl(model)).toBe(TravisSpecDataProvider.URL +
            '/builds.json');
    });

});
