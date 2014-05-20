/// <reference path='../../jasmine.d'/>
import SonarConnector = require('../../../../main/ts/sonar/connector/SonarConnector');
import SonarMonitorModel = require('../../../../main/ts/sonar/model/SonarMonitorModel');
import SonarModuleModel = require('../../../../main/ts/sonar/model/SonarModuleModel');
import SonarSpecDataProvider = require('../SonarSpecDataProvider');

/**
 * Tests {@link SonarModuleModel}
 */
describe('SonarModuleModel', function():void {
    var dataProvider: SonarSpecDataProvider = new SonarSpecDataProvider();
    var model: SonarMonitorModel = dataProvider.getSonarMonitorModel();
    var connector: SonarConnector = dataProvider.getSonarConnector();
    var testling: SonarModuleModel = model.getModuleModels()[0];

    it('Test data access without backend data', function(): void {
        expect(testling.getUrl()).toBe('');
        expect(testling.getModuleName()).toBe(SonarSpecDataProvider.REF_ID_1);
        expect(testling.getName()).toBe(SonarSpecDataProvider.REF_NAME_1);
        expect(testling.getViolations).toNotBe(undefined);
    });

    it('Test data access with backend data', function(): void {
        connector.updateModel([SonarSpecDataProvider.JSON_RESPONSE], model, SonarSpecDataProvider.REF_ID_1);
        expect(testling.getUrl()).toBe('https://myhost:8080/myprefix/drilldown/violations/67592');
        expect(testling.getModuleName()).toBe(SonarSpecDataProvider.REF_ID_1);
        expect(testling.getName()).toBe(SonarSpecDataProvider.REF_NAME_1);
        expect(testling.getViolations).toNotBe(undefined);
    });

});
