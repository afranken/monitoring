/// <reference path='../../jasmine.d'/>
import SonarMonitorModel = require('../../../../main/ts/sonar/model/SonarMonitorModel');
import SonarConnector = require('../../../../main/ts/sonar/connector/SonarConnector');
import SonarSpecDataProvider = require('../SonarSpecDataProvider');

/**
 * Tests {@link SonarConnector}
 */
describe('SonarConnector', function():void {
    var dataProvider: SonarSpecDataProvider = new SonarSpecDataProvider();

    var monitor: SonarMonitorModel = <SonarMonitorModel>dataProvider.getSonarMonitorModel();

    var testling: SonarConnector = dataProvider.getSonarConnector();

    /**
     * Test all methods
     */
    it('TestMethods', function(): void {
        expect(testling.getExpiry()).toBe(SonarSpecDataProvider.EXPIRY);
        expect(testling.getApiUrl(monitor,'mymodule'))
            .toBe('https://myhost:8080/myprefix/api/resources?callback=?&format=json&metrics=blocker_violations,critical_violations,major_violations,minor_violations,info_violations&resource=mymodule');
        expect(testling.getModuleUrl(monitor,'mymodule')).toBe('https://myhost:8080/myprefix/drilldown/violations/mymodule');
    });

});