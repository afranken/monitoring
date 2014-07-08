/// <reference path='../../jasmine.d'/>
/// <reference path='../../reference'/>
///ts:import=SonarMonitorModel
import SonarMonitorModel = require('../../../../main/ts/sonar/model/SonarMonitorModel'); ///ts:import:generated
///ts:import=SonarSpecDataProvider
import SonarSpecDataProvider = require('../SonarSpecDataProvider'); ///ts:import:generated

/**
 * Tests {@link SonarMonitorModel}
 */
describe('SonarMonitorModel', function():void {
    var dataProvider: SonarSpecDataProvider = new SonarSpecDataProvider();

    var testling: SonarMonitorModel = <SonarMonitorModel>dataProvider.getSonarMonitorModel();

    it('Test Methods', function(): void {
        expect(testling.getUrl()).toBe('');
        expect(testling.getHostname()).toBe(SonarSpecDataProvider.HOST);
        expect(testling.getName()).toBe(SonarSpecDataProvider.NAME);
        expect(testling.getModuleModels()).toNotBe(undefined);
    });

});
