/// <reference path='../../jasmine.d'/>
/// <reference path='../../reference'/>
///ts:import=SonarConnector
import SonarConnector = require('../../../../main/ts/sonar/connector/SonarConnector'); ///ts:import:generated
///ts:import=SonarMonitorModel
import SonarMonitorModel = require('../../../../main/ts/sonar/model/SonarMonitorModel'); ///ts:import:generated
///ts:import=SonarModuleModel
import SonarModuleModel = require('../../../../main/ts/sonar/model/SonarModuleModel'); ///ts:import:generated
///ts:import=SonarViolationModel
import SonarViolationModel = require('../../../../main/ts/sonar/model/SonarViolationModel'); ///ts:import:generated
///ts:import=CssClasses
import CssClasses = require('../../../../main/ts/util/CssClasses'); ///ts:import:generated
///ts:import=SonarSpecDataProvider
import SonarSpecDataProvider = require('../SonarSpecDataProvider'); ///ts:import:generated
/**
 * Tests {@link SonarViolationModel}
 */
describe('SonarViolationModel', function():void {
    var dataProvider: SonarSpecDataProvider = new SonarSpecDataProvider();
    var model: SonarMonitorModel = dataProvider.getSonarMonitorModel();
    var connector: SonarConnector = dataProvider.getSonarConnector();
    var moduleModel;
    model.getModuleModels().forEach((localModuleModel) => {
        if(localModuleModel.getModuleName() === SonarSpecDataProvider.REF_ID_1) {
            moduleModel = localModuleModel;
        }
    });

    var testlings: Array<SonarViolationModel> = moduleModel.getViolations();

    it('Test data access without backend data', function(): void {
        expect(testlings[0].getCount()).toBe(0);
        expect(testlings[0].getCss()).toBe(SonarViolationModel.BASIC_CLASSES);
    });

    it('Test data access with backend data', function(): void {
        connector.updateModel([SonarSpecDataProvider.JSON_RESPONSE], model, SonarSpecDataProvider.REF_ID_1);
        expect(testlings[0].getCount()).toBe(SonarSpecDataProvider.COUNT_BLOCKER);
        expect(testlings[0].getCss()).toBe(SonarViolationModel.BASIC_CLASSES + CssClasses.SUCCESS);
        expect(testlings[1].getCount()).toBe(SonarSpecDataProvider.COUNT_CRITICAL);
        expect(testlings[1].getCss()).toBe(SonarViolationModel.BASIC_CLASSES + CssClasses.SUCCESS);
        expect(testlings[2].getCount()).toBe(SonarSpecDataProvider.COUNT_MAJOR);
        expect(testlings[2].getCss()).toBe(SonarViolationModel.BASIC_CLASSES + CssClasses.WARNING);
        expect(testlings[3].getCount()).toBe(SonarSpecDataProvider.COUNT_MINOR);
        expect(testlings[3].getCss()).toBe(SonarViolationModel.BASIC_CLASSES + CssClasses.WARNING);
        expect(testlings[4].getCount()).toBe(SonarSpecDataProvider.COUNT_INFO);
        expect(testlings[4].getCss()).toBe(SonarViolationModel.BASIC_CLASSES + CssClasses.WARNING);
    });

});
