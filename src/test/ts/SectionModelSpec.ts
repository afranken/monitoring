/// <reference path="jasmine"/>
import Configuration = require('../../main/ts/configuration/Configuration');
import MonitorModels = require('../../main/ts/monitorModel/MonitorModels');
import SectionModel = require('../../main/ts/SectionModel');
import Config = require('../../main/ts/jsonInterfaces/Config');
import Types = require('../../main/ts/Types');

/**
 * Tests {@link Configuration}
 */
describe("SectionModel", function():void {

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

    var testling1:SectionModel = new SectionModel(sectionJson1,undefined,"");
    var testling2:SectionModel = new SectionModel(sectionJson3,undefined,"");
    var testling3:SectionModel = new SectionModel(sectionJson7,undefined,"");

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling1.getColumnWidth()).toBe(12);
        expect(testling2.getColumnWidth()).toBe(4);
        expect(testling3.getColumnWidth()).toBe(1);
    });

});