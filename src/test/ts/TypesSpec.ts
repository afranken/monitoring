/// <reference path="jasmine"/>
import Configuration = require('../../main/ts/configuration/Configuration');
import MonitorModels = require('../../main/ts/monitorModel/MonitorModels');
import MonitorViewModel = require('../../main/ts/monitorModel/MonitorViewModel');
import Config = require('../../main/ts/jsonInterfaces/Config');
import Types = require('../../main/ts/util/Types');

/**
 * Tests {@link Types}
 */
describe("Types", function():void {

    var configuration:Configuration = new Configuration({});

    var jenkinsConfig:Config.Monitor = {
        "externalRef": "123",
        "type": "jenkins"
    };
    var jenkinsModel:MonitorViewModel = MonitorModels.createViewModel(jenkinsConfig, configuration, "hostname");

    var nagiosConfig:Config.Monitor = {
        "externalRef": [
            {
                "name": "myname",
                "externalId": "123"
            }
        ],
        "type": "nagios"
    };
    var nagiosModel:MonitorViewModel = MonitorModels.createViewModel(nagiosConfig, configuration, "hostname");

    var sonarConfig:Config.Monitor = {
        "externalRef": [
            {
                "externalId": "123"
            }
        ],
        "type": "sonar"
    };
    var sonarModel:MonitorViewModel = MonitorModels.createViewModel(sonarConfig, configuration, "hostname");

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(Types.isJenkinsModel(jenkinsModel)).toBeTruthy();
        expect(Types.isJenkins("jenkins")).toBeTruthy();
        expect(Types.isNagiosModel(nagiosModel)).toBeTruthy();
        expect(Types.isNagios("nagios")).toBeTruthy();
        expect(Types.isSonarModel(sonarModel)).toBeTruthy();
        expect(Types.isSonar("sonar")).toBeTruthy();
    });

});