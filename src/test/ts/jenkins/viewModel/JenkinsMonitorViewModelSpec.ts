/// <reference path="../../jasmine.d"/>
import Types = require('../../../../main/ts/util/Types');
import JenkinsMonitorViewModel = require('../../../../main/ts/jenkins/viewModel/JenkinsMonitorViewModel');
import JenkinsDetailsViewModel = require('../../../../main/ts/jenkins/viewModel/JenkinsDetailsViewModel');
import JenkinsSpecDataProvider = require('../JenkinsSpecDataProvider');

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
