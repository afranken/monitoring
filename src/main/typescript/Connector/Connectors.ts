import Connector = require('./Connector');
import Types = require('../Types');
import Configuration = require('../Configuration/Configuration');
import SonarConnector = require('../Sonar/SonarConnector');
import NagiosConnector = require('../Nagios/NagiosConnector');
import JenkinsConnector = require('../Jenkins/JenkinsConnector');
import SonarMonitorModel = require('../Sonar/SonarMonitorModel');
import NagiosMonitorModel = require('../Nagios/NagiosMonitorModel');
import JenkinsMonitorModel = require('../Jenkins/JenkinsMonitorModel');

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