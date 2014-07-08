/// <reference path='jasmine.d'/>
/// <reference path='reference'/>
import Config = require('Config');
///ts:import=Configuration
import Configuration = require('../../main/ts/configuration/Configuration'); ///ts:import:generated
///ts:import=MonitorModels
import MonitorModels = require('../../main/ts/model/MonitorModels'); ///ts:import:generated
///ts:import=SectionViewModel
import SectionViewModel = require('../../main/ts/sections/SectionViewModel'); ///ts:import:generated
///ts:import=SectionModels
import SectionModels = require('../../main/ts/sections/SectionModels'); ///ts:import:generated
///ts:import=Types
import Types = require('../../main/ts/util/Types'); ///ts:import:generated

/**
 * Tests {@link SectionViewModel}
 */
describe("SectionViewModel", function():void {

    var sectionJson1: Config.Section = {
        "sections": [
            {
                "title": "1"
            }
        ]
    };

    var sectionJson3: Config.Section = {
        "sections": [
            {
                "title": "1"
            },
            {
                "title": "2"
            },
            {
                "title": "3"
            }
        ]
    };

    var sectionJson7: Config.Section = {
        "sections": [
            {
                "title": "1"
            },
            {
                "title": "2"
            },
            {
                "title": "3"
            },
            {
                "title": "4"
            },
            {
                "title": "5"
            },
            {
                "title": "6"
            },
            {
                "title": "7"
            }
        ]
    };

    var testling1:SectionViewModel = SectionModels.createViewModel(sectionJson1,undefined,"");
    var testling2:SectionViewModel = SectionModels.createViewModel(sectionJson3,undefined,"");
    var testling3:SectionViewModel = SectionModels.createViewModel(sectionJson7,undefined,"");

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling1.getColumnWidth()).toBe(12);
        expect(testling2.getColumnWidth()).toBe(4);
        expect(testling3.getColumnWidth()).toBe(1);
    });

});