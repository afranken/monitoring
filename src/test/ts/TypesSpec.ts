/// <reference path="jasmine"/>
import Configuration = require('../../main/ts/configuration/Configuration');
import MonitorModels = require('../../main/ts/monitorModel/MonitorModels');
import MonitorModel = require('../../main/ts/monitorModel/MonitorModel');
import Config = require('../../main/ts/jsonInterfaces/Config');
import Types = require('../../main/ts/Types');

/**
 * Tests {@link Configuration}
 */
describe("Types", function():void {

    var configuration:Configuration = new Configuration({});

    var jenkinsConfig:Config.Monitor = {
        "id": "123",
        "type": "jenkins"
    };
    var jenkinsModel:MonitorModel = MonitorModels.createModel(jenkinsConfig, configuration, "hostname");

    var nagiosConfig:Config.Monitor = {
        "id": "123",
        "type": "nagios"
    };
    var nagiosModel:MonitorModel = MonitorModels.createModel(nagiosConfig, configuration, "hostname");

    var sonarConfig:Config.Monitor = {
        "id": "123",
        "type": "sonar"
    };
    var sonarModel:MonitorModel = MonitorModels.createModel(sonarConfig, configuration, "hostname");

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