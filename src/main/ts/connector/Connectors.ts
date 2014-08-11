///ts:import=Connector
import Connector = require('./Connector'); ///ts:import:generated
///ts:import=Types
import Types = require('../util/Types'); ///ts:import:generated
///ts:import=Configuration
import Configuration = require('../configuration/Configuration'); ///ts:import:generated
///ts:import=SonarConnector
import SonarConnector = require('../sonar/connector/SonarConnector'); ///ts:import:generated
///ts:import=NagiosConnector
import NagiosConnector = require('../nagios/connector/NagiosConnector'); ///ts:import:generated
///ts:import=JenkinsConnector
import JenkinsConnector = require('../jenkins/connector/JenkinsConnector'); ///ts:import:generated
///ts:import=TravisConnector
import TravisConnector = require('../travis/connector/TravisConnector'); ///ts:import:generated

/**
 * This class contains static methods that help with {@link Connector}.
 */
class Connectors {

    /**
     * Create a {@link Connector} implementation matching the type of the {@link Config.Monitor}
     *
     * @param configuration
     * @param type
     * @returns Connector
     */
    public static createConnector(configuration: Configuration, type: string): Connector {
        var connector: Connector = undefined;

        if (Types.isJenkins(type)) {
            connector = new JenkinsConnector(configuration);
        } else if (Types.isNagios(type)) {
            connector = new NagiosConnector(configuration);
        } else if (Types.isSonar(type)) {
            connector = new SonarConnector(configuration);
        } else if (Types.isTravis(type)) {
            connector = new TravisConnector(configuration);
        }

        return connector;
    }

}

export = Connectors;
