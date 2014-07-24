///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=JenkinsMonitorModel
import JenkinsMonitorModel = require('../../../../main/ts/jenkins/model/JenkinsMonitorModel'); ///ts:import:generated
///ts:import=JenkinsConnector
import JenkinsConnector = require('../../../../main/ts/jenkins/connector/JenkinsConnector'); ///ts:import:generated
///ts:import=JenkinsSpecDataProvider
import JenkinsSpecDataProvider = require('../JenkinsSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link JenkinsConnector}
 */
describe('JenkinsConnector', function(): void {

    var dataProvider: JenkinsSpecDataProvider = new JenkinsSpecDataProvider();
    var model: JenkinsMonitorModel = dataProvider.getJenkinsMonitorModel();
    var testling: JenkinsConnector = dataProvider.getJenkinsConnector();

    /**
     * Test all methods
     */
    it('Test Methods', function(): void {
        expect(testling.getExpiry()).toBe(JenkinsSpecDataProvider.EXPIRY);
        expect(testling.getJobUrl(model)).toBe(JenkinsSpecDataProvider.JOB_URL);
        expect(testling.getApiUrl(model)).toBe(JenkinsSpecDataProvider.JOB_URL +
            '/api/json?jsonp=?&tree=name,url,displayName,color,lastBuild' +
            '[timestamp,building,duration,estimatedDuration,url,result,number,id,failCount,skipCount,totalCount,actions' +
            '[lastBuiltRevision[branch[SHA1,name]],failCount,skipCount,totalCount]]&depth=1');
    });

});
