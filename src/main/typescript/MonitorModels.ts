import Types = require('./Types');
import MonitorModel = require('./MonitorModel');
import Config = require('./JsonInterfaces/Config');
import Configuration = require('./Configuration/Configuration');
import Connector = require('./Connector/Connector');
import Connectors = require('./Connector/Connectors');
import SonarMonitorModel = require('./Sonar/SonarMonitorModel');
import NagiosMonitorModel = require('./Nagios/NagiosMonitorModel');
import JenkinsMonitorModel = require('./Jenkins/JenkinsMonitorModel');

/**
 * This class contains static methods that help with MonitorModels.
 */
class MonitorModels {

    /**
     * Create a {@link MonitorModel} implementation matching the type of the {@link Config.Monitor}
     *
     * @param monitor
     * @param hostname
     * @param configuration
     * @returns MonitorModel
     */
    public static createModel(monitor:Config.Monitor, configuration:Configuration, hostname:string):MonitorModel {
        var model:MonitorModel = undefined;

        if(Types.isJenkins(monitor.type)) {
            model = new JenkinsMonitorModel(monitor, Connectors.createConnector(configuration,Types.JENKINS), hostname);
        } else if(Types.isNagios(monitor.type)) {
            model = new NagiosMonitorModel(monitor, Connectors.createConnector(configuration,Types.NAGIOS), hostname);
        } else if(Types.isSonar(monitor.type)) {
            model = new SonarMonitorModel(monitor, Connectors.createConnector(configuration,Types.SONAR), hostname);
        }

        return model;
    }

}

export = MonitorModels;