/// <reference path="../jasmine"/>
import Configuration = require('../../../main/ts/configuration/Configuration');
import Connectors = require('../../../main/ts/connector/Connectors');
import Connector = require('../../../main/ts/connector/Connector');
import JenkinsConnector = require('../../../main/ts/jenkins/connector/JenkinsConnector');
import SonarConnector = require('../../../main/ts/sonar/SonarConnector');
import NagiosConnector = require('../../../main/ts/nagios/NagiosConnector');

/**
 * Tests {@link Connectors}
 */
describe("Connectors", function():void {

    var configuration:Configuration = new Configuration({});

    var jenkinsConnector:Connector = Connectors.createConnector(configuration,"jenkins");
    var nagiosConnector:Connector = Connectors.createConnector(configuration,"nagios");
    var sonarConnector:Connector = Connectors.createConnector(configuration,"sonar");

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(jenkinsConnector instanceof JenkinsConnector).toBeTruthy();
        expect(sonarConnector instanceof SonarConnector).toBeTruthy();
        expect(nagiosConnector instanceof NagiosConnector).toBeTruthy();
    });

});