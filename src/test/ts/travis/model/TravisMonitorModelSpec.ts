///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../../../../main/ts/travis/model/TravisMonitorModel'); ///ts:import:generated
///ts:import=TravisSpecDataProvider
import TravisSpecDataProvider = require('../TravisSpecDataProvider'); ///ts:import:generated


/**
 * Tests {@link TravisMonitorModel}
 */
describe('TravisMonitorModel', function(): void {

    var dataProvider: TravisSpecDataProvider = new TravisSpecDataProvider();
    var testling: TravisMonitorModel = dataProvider.getTravisMonitorModel();

    it('Test Fields', function(): void {
        expect(testling.getHostname()).toBe(TravisSpecDataProvider.HOST);
        expect(testling.getName()).toBe(TravisSpecDataProvider.NAME);
        expect(testling.getExternalRef()).toBe(TravisSpecDataProvider.REF);
        expect(testling.getExpiry()).toBe(TravisSpecDataProvider.EXPIRY);
        expect(testling.getHtmlsafeId()).toBe(TravisSpecDataProvider.HTMLSAFE_REF);

        expect(testling.getJobUrl()).toBe(TravisSpecDataProvider.JOB_URL);
    });

    it('Test data access without backend data', function(): void{
        expect(testling.getLastBuild()).toBeUndefined();
        expect(testling.getResponseColor()).toBeUndefined();
        expect(testling.getResponseTimestamp()).toBeUndefined();
        expect(testling.getDuration()).toBeUndefined();
        expect(testling.getBuildNumber()).toBeUndefined();
        expect(testling.getLastBuildUrl()).toBeUndefined();
        expect(testling.getLastBuildCommitHash()).toBeUndefined();
        expect(testling.getLastBuildBranchName()).toBeUndefined();
    });

    it('Test Fields with backend data', function(): void {
        testling.setData(TravisSpecDataProvider.JSON_RESPONSE);

        expect(testling.getHostname()).toBe(TravisSpecDataProvider.HOST);
        expect(testling.getName()).toBe(TravisSpecDataProvider.NAME);
        expect(testling.getExternalRef()).toBe(TravisSpecDataProvider.REF);
        expect(testling.getExpiry()).toBe(TravisSpecDataProvider.EXPIRY);
        expect(testling.getHtmlsafeId()).toBe(TravisSpecDataProvider.HTMLSAFE_REF);

        expect(testling.getJobUrl()).toBe(TravisSpecDataProvider.JOB_URL);
    });

    it('Test data access with backend data', function(): void {
        testling.setData(TravisSpecDataProvider.JSON_RESPONSE);

        expect(testling.getLastBuild()).toBe(TravisSpecDataProvider.JSON_RESPONSE[0]);
        expect(testling.getResponseColor()).toBe(TravisSpecDataProvider.COLOR);
        expect(testling.getResponseTimestamp()).toBe(TravisSpecDataProvider.TIMESTAMP);
        expect(testling.getDuration()).toBe(TravisSpecDataProvider.DURATION);
        expect(testling.getBuildNumber()).toBe(TravisSpecDataProvider.BUILD_NUMBER);
        expect(testling.getLastBuildUrl()).toBe(TravisSpecDataProvider.BUILD_URL);
        expect(testling.getLastBuildCommitHash()).toBe(TravisSpecDataProvider.COMMIT_HASH);
        expect(testling.getLastBuildBranchName()).toBe(TravisSpecDataProvider.BRANCH_NAME);
    });

});
