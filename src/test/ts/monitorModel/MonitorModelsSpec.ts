/// <reference path="../jasmine"/>
import MonitorModels = require('../../../main/ts/monitorModel/MonitorModels');

/**
 * Tests {@link Configuration}
 */
describe("MonitorModelsBase", function():void {

    var _STRING:string = 'a.b?c(d%1';
    var _CONVERTED_STRING:string = 'a-b-c-d-1';

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(MonitorModels.getHtmlsafeId(_STRING)).toBe(_CONVERTED_STRING);
    });

});