/// <reference path="../../jasmine.d"/>
import JenkinsMonitorModel = require('../../../../main/ts/jenkins/model/JenkinsMonitorModel');
import JenkinsConnector = require('../../../../main/ts/jenkins/connector/JenkinsConnector');
import JenkinsSpecDataProvider = require('../JenkinsSpecDataProvider');

/**
 * Tests {@link JenkinsConnector}
 */
describe("JenkinsConnector", function():void {

    var dataProvider:JenkinsSpecDataProvider = new JenkinsSpecDataProvider();
    var model:JenkinsMonitorModel = dataProvider.getJenkinsMonitorModel();
    var testling:JenkinsConnector = dataProvider.getJenkinsConnector();

    /**
     * Test all methods
     */
    it("Test Methods", function():void {
        expect(testling.getExpiry()).toBe(JenkinsSpecDataProvider.EXPIRY);
        expect(testling.getJobUrl(model)).toBe(JenkinsSpecDataProvider.JOB_URL);
        expect(testling.getApiUrl(model)).toBe(JenkinsSpecDataProvider.JOB_URL+'/api/json?jsonp=?&tree=name,url,displayName,color,lastBuild[timestamp,building,duration,estimatedDuration,url,result,number,id,failCount,skipCount,totalCount,actions[lastBuiltRevision[branch[SHA1,name]],failCount,skipCount,totalCount]]&depth=1');
    });

});
