///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=JenkinsMonitorModel
import JenkinsMonitorModel = require('../../../../main/ts/jenkins/model/JenkinsMonitorModel'); ///ts:import:generated
///ts:import=JenkinsDetailsViewModel
import JenkinsDetailsViewModel = require('../../../../main/ts/jenkins/viewModel/JenkinsDetailsViewModel'); ///ts:import:generated
///ts:import=JenkinsSpecDataProvider
import JenkinsSpecDataProvider = require('../JenkinsSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link JenkinsDetailsViewModel}
 */
describe('JenkinsDetailsViewModel', function(): void {

    var dataProvider: JenkinsSpecDataProvider = new JenkinsSpecDataProvider();
    var model: JenkinsMonitorModel = dataProvider.getJenkinsMonitorModel();
    var testling: JenkinsDetailsViewModel = new JenkinsDetailsViewModel(model);

    var _START_DATE: string = 'a few seconds ago';
    var _DURATION: string = 'an hour';

    it('Test methods without backend data', function(): void{
        expect(testling.getUrl()).toBe(JenkinsSpecDataProvider.JOB_URL);
        expect(testling.getName()).toBe(JenkinsSpecDataProvider.NAME);
        expect(testling.getCommitHash()).toBeUndefined();
        expect(testling.getBranchName()).toBeUndefined();
        expect(testling.getRunTime()).toBeUndefined();
        expect(testling.getBuildNumber()).toBeUndefined();
        expect(testling.getBuildNumberUrl()).toBeUndefined();
        expect(testling.getStartDate()).toBeUndefined();
    });

    it('Test methods with backend data', function(): void {
        model.setData(JenkinsSpecDataProvider.JSON_RESPONSE);

        expect(testling.getUrl()).toBe(JenkinsSpecDataProvider.JOB_URL);
        expect(testling.getName()).toBe(JenkinsSpecDataProvider.NAME);
        expect(testling.getCommitHash()).toBe(JenkinsSpecDataProvider.COMMIT_HASH);
        expect(testling.getBranchName()).toBe(JenkinsSpecDataProvider.BRANCH_NAME);
        expect(testling.getRunTime()).toEqual(_DURATION);
        expect(testling.getBuildNumber()).toBe(JenkinsSpecDataProvider.BUILD_NUMBER);
        expect(testling.getBuildNumberUrl()).toBe(JenkinsSpecDataProvider.URL);
        expect(testling.getStartDate()).toEqual(_START_DATE);
    });

});
