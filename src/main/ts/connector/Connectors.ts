import Connector = require('./Connector');
import Types = require('../util/Types');
import Configuration = require('../configuration/Configuration');
import SonarConnector = require('../sonar/SonarConnector');
import NagiosConnector = require('../nagios/NagiosConnector');
import JenkinsConnector = require('../jenkins/connector/JenkinsConnector');
import SonarMonitorModel = require('../sonar/SonarMonitorModel');
import NagiosMonitorModel = require('../nagios/NagiosMonitorModel');
import JenkinsMonitorModel = require('../jenkins/model/JenkinsMonitorModel');

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
    public static createConnector(configuration:Configuration, type:string):Connector {
        var connector:Connector = undefined;

        if(Types.isJenkins(type)) {
            connector = new JenkinsConnector(configuration);
        } else if(Types.isNagios(type)) {
            connector = new NagiosConnector(configuration);
        } else if(Types.isSonar(type)) {
            connector = new SonarConnector(configuration);
        }

        return connector;
    }

}

export = Connectors;