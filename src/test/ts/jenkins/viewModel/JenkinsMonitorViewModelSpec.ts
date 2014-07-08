/// <reference path='../../jasmine.d'/>
/// <reference path='../../reference'/>
///ts:import=Types
import Types = require('../../../../main/ts/util/Types'); ///ts:import:generated
///ts:import=JenkinsMonitorViewModel
import JenkinsMonitorViewModel = require('../../../../main/ts/jenkins/viewModel/JenkinsMonitorViewModel'); ///ts:import:generated
///ts:import=JenkinsDetailsViewModel
import JenkinsDetailsViewModel = require('../../../../main/ts/jenkins/viewModel/JenkinsDetailsViewModel'); ///ts:import:generated
///ts:import=JenkinsSpecDataProvider
import JenkinsSpecDataProvider = require('../JenkinsSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link JenkinsMonitorViewModel}
 */
describe("JenkinsMonitorViewModel", function():void {

    var dataProvider:JenkinsSpecDataProvider = new JenkinsSpecDataProvider();
    var testling:JenkinsMonitorViewModel = dataProvider.getJenkinsMonitorViewModel();

    it("Test methods", function():void{
        expect(testling.getBox()).toBeDefined();
        expect(testling.getDetails()).toBeDefined();
        expect(testling.getHtmlsafeId()).toEqual(JenkinsSpecDataProvider.HTMLSAFE_REF);
        expect(testling.getType()).toEqual(Types.JENKINS);
    });

});
