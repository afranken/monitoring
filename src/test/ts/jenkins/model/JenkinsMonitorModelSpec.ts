///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=JenkinsMonitorModel
import JenkinsMonitorModel = require('../../../../main/ts/jenkins/model/JenkinsMonitorModel'); ///ts:import:generated
///ts:import=JenkinsSpecDataProvider
import JenkinsSpecDataProvider = require('../JenkinsSpecDataProvider'); ///ts:import:generated


/**
 * Tests {@link JenkinsMonitorModel}
 */
describe("JenkinsMonitorModel", function():void {

    var dataProvider:JenkinsSpecDataProvider = new JenkinsSpecDataProvider();
    var testling:JenkinsMonitorModel = dataProvider.getJenkinsMonitorModel();

    it("Test Fields", function():void {
        expect(testling.getHostname()).toBe(JenkinsSpecDataProvider.HOST);
        expect(testling.getName()).toBe(JenkinsSpecDataProvider.NAME);
        expect(testling.getExternalRef()).toBe(JenkinsSpecDataProvider.REF);
        expect(testling.getExpiry()).toBe(JenkinsSpecDataProvider.EXPIRY);
        expect(testling.getHtmlsafeId()).toBe(JenkinsSpecDataProvider.HTMLSAFE_REF);

        expect(testling.getJobUrl()).toBe(JenkinsSpecDataProvider.JOB_URL);
    });

    it("Test data access without backend data", function():void{
        expect(testling.getLastBuild()).toBeUndefined();
        expect(testling.getLastBuiltRevision()).toBeUndefined();
        expect(testling.getResponseColor()).toBeUndefined();
        expect(testling.getResponseTimestamp()).toBeUndefined();
        expect(testling.getEstimatedDuration()).toBeUndefined();
        expect(testling.getDuration()).toBeUndefined();
        expect(testling.getBuildNumber()).toBeUndefined();
        expect(testling.getLastBuildUrl()).toBeUndefined();
        expect(testling.getLastBuildCommitHash()).toBeUndefined();
        expect(testling.getLastBuildBranchName()).toBeUndefined();
    });

    it("Test Fields with backend data", function():void {
        testling.setData(JenkinsSpecDataProvider.JSON_RESPONSE);

        expect(testling.getHostname()).toBe(JenkinsSpecDataProvider.HOST);
        expect(testling.getName()).toBe(JenkinsSpecDataProvider.NAME);
        expect(testling.getExternalRef()).toBe(JenkinsSpecDataProvider.REF);
        expect(testling.getExpiry()).toBe(JenkinsSpecDataProvider.EXPIRY);
        expect(testling.getHtmlsafeId()).toBe(JenkinsSpecDataProvider.HTMLSAFE_REF);

        expect(testling.getJobUrl()).toBe(JenkinsSpecDataProvider.JOB_URL);
    });

    it("Test data access with backend data", function():void {
        testling.setData(JenkinsSpecDataProvider.JSON_RESPONSE);

        expect(testling.getLastBuild()).toBe(JenkinsSpecDataProvider.LAST_BUILD);
        expect(testling.getLastBuiltRevision()).toBe(JenkinsSpecDataProvider.LAST_BUILD_REVISION);
        expect(testling.getResponseColor()).toBe(JenkinsSpecDataProvider.COLOR);
        expect(testling.getResponseTimestamp()).toBe(JenkinsSpecDataProvider.TIMESTAMP);
        expect(testling.getEstimatedDuration()).toBe(JenkinsSpecDataProvider.ESTIMATED_DURATION);
        expect(testling.getDuration()).toBe(JenkinsSpecDataProvider.DURATION);
        expect(testling.getBuildNumber()).toBe(JenkinsSpecDataProvider.BUILD_NUMBER);
        expect(testling.getLastBuildUrl()).toBe(JenkinsSpecDataProvider.URL);
        expect(testling.getLastBuildCommitHash()).toBe(JenkinsSpecDataProvider.COMMIT_HASH);
        expect(testling.getLastBuildBranchName()).toBe(JenkinsSpecDataProvider.BRANCH_NAME);
    });

});
