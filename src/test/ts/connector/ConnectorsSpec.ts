///ts:ref=jasmine.d.ts
/// <reference path="../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=Configuration
import Configuration = require('../../../main/ts/configuration/Configuration'); ///ts:import:generated
///ts:import=Connectors
import Connectors = require('../../../main/ts/connector/Connectors'); ///ts:import:generated
///ts:import=Connector
import Connector = require('../../../main/ts/connector/Connector'); ///ts:import:generated
///ts:import=JenkinsConnector
import JenkinsConnector = require('../../../main/ts/jenkins/connector/JenkinsConnector'); ///ts:import:generated
///ts:import=SonarConnector
import SonarConnector = require('../../../main/ts/sonar/connector/SonarConnector'); ///ts:import:generated
///ts:import=NagiosConnector
import NagiosConnector = require('../../../main/ts/nagios/connector/NagiosConnector'); ///ts:import:generated

/**
 * Tests {@link Connectors}
 */
describe('Connectors', function(): void {

    var configuration: Configuration = new Configuration({});

    var jenkinsConnector: Connector = Connectors.createConnector(configuration, 'jenkins');
    var nagiosConnector: Connector = Connectors.createConnector(configuration, 'nagios');
    var sonarConnector: Connector = Connectors.createConnector(configuration, 'sonar');

    /**
     * Test all methods
     */
    it('TestMethods', function(): void {
        expect(jenkinsConnector instanceof JenkinsConnector).toBeTruthy();
        expect(sonarConnector instanceof SonarConnector).toBeTruthy();
        expect(nagiosConnector instanceof NagiosConnector).toBeTruthy();
    });

});
