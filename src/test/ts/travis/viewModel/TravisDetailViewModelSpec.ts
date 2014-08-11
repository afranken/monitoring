///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../../../../main/ts/travis/model/TravisMonitorModel'); ///ts:import:generated
///ts:import=TravisDetailsViewModel
import TravisDetailsViewModel = require('../../../../main/ts/travis/viewModel/TravisDetailsViewModel'); ///ts:import:generated
///ts:import=TravisSpecDataProvider
import TravisSpecDataProvider = require('../TravisSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link TravisDetailsViewModel}
 */
describe('TravisDetailsViewModel', function(): void {

    var dataProvider: TravisSpecDataProvider = new TravisSpecDataProvider();
    var model: TravisMonitorModel = dataProvider.getTravisMonitorModel();
    var testling: TravisDetailsViewModel = new TravisDetailsViewModel(model);

    var _START_DATE: string = 'a few seconds ago';
    var _DURATION: string = '2 minutes';

    it('Test methods without backend data', function(): void{
        expect(testling.getUrl()).toBe(TravisSpecDataProvider.JOB_URL);
        expect(testling.getName()).toBe(TravisSpecDataProvider.NAME);
        expect(testling.getCommitHash()).toBeUndefined();
        expect(testling.getBranchName()).toBeUndefined();
        expect(testling.getRunTime()).toBeUndefined();
        expect(testling.getBuildNumber()).toBeUndefined();
        expect(testling.getBuildNumberUrl()).toBeUndefined();
        expect(testling.getStartDate()).toBeUndefined();
    });

    it('Test methods with backend data', function(): void {
        model.setData(TravisSpecDataProvider.JSON_RESPONSE);

        expect(testling.getUrl()).toBe(TravisSpecDataProvider.JOB_URL);
        expect(testling.getName()).toBe(TravisSpecDataProvider.NAME);
        expect(testling.getCommitHash()).toBe(TravisSpecDataProvider.COMMIT_HASH);
        expect(testling.getBranchName()).toBe(TravisSpecDataProvider.BRANCH_NAME);
        expect(testling.getRunTime()).toEqual(_DURATION);
        expect(testling.getBuildNumber()).toBe(TravisSpecDataProvider.BUILD_NUMBER);
        expect(testling.getBuildNumberUrl()).toBe(TravisSpecDataProvider.BUILD_URL);
        expect(testling.getStartDate()).toEqual(_START_DATE);
    });

});
