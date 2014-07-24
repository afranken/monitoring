///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=JenkinsMonitorModel
import JenkinsMonitorModel = require('../../../../main/ts/jenkins/model/JenkinsMonitorModel'); ///ts:import:generated
///ts:import=JenkinsBoxViewModel
import JenkinsBoxViewModel = require('../../../../main/ts/jenkins/viewModel/JenkinsBoxViewModel'); ///ts:import:generated
///ts:import=JenkinsSpecDataProvider
import JenkinsSpecDataProvider = require('../JenkinsSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link JenkinsDetailsViewModel}
 */
describe('JenkinsDetailsViewModel', function(): void {

    var dataProvider: JenkinsSpecDataProvider = new JenkinsSpecDataProvider();
    var model: JenkinsMonitorModel = dataProvider.getJenkinsMonitorModel();
    var testling: JenkinsBoxViewModel = new JenkinsBoxViewModel(model);

    it('Test methods without backend data', function(): void{
        expect(testling.getHtmlsafeId()).toBe(JenkinsSpecDataProvider.HTMLSAFE_REF);
        expect(testling.getName()).toBe(JenkinsSpecDataProvider.NAME);
        expect(testling.getCompletedPercent()).toBeUndefined();
        expect(testling.getStyle()).toEqual('opacity: 1');
        expect(testling.getBuildingStyle()).toBeUndefined();
        expect(testling.getCss()).toEqual(' jobstatus  alert ');
    });

    it('Test methods with backend data', function(): void {
        model.setData(JenkinsSpecDataProvider.JSON_RESPONSE);

        expect(testling.getHtmlsafeId()).toBe(JenkinsSpecDataProvider.HTMLSAFE_REF);
        expect(testling.getName()).toBe(JenkinsSpecDataProvider.NAME);
        expect(testling.getCompletedPercent()).toBe(0);
        expect(testling.getStyle()).toMatch('opacity: 0.99\\d+');
        expect(testling.getBuildingStyle()).toBeUndefined();
        expect(testling.getCss()).toEqual(' jobstatus  alert  alert-success ');
    });

});
