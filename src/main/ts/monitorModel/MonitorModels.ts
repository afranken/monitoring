import Types = require('../Types');
import MonitorModel = require('./MonitorModel');
import Config = require('../jsonInterfaces/Config.d');
import Configuration = require('../configuration/Configuration');
import Connector = require('../connector/Connector');
import Connectors = require('../connector/Connectors');
import SonarMonitorModel = require('../sonar/SonarMonitorModel');
import NagiosMonitorModel = require('../nagios/NagiosMonitorModel');
import JenkinsMonitorModel = require('../jenkins/JenkinsMonitorModel');

/**
 * This class contains static methods that help with MonitorModels.
 */
class MonitorModels {

    private static _PATTERN:RegExp = new RegExp('\\W','g');
    private static _REPLACEMENT_CHAR = '-';

    public static getHtmlsafeId(id:string):string {
        return id.replace(MonitorModels._PATTERN,MonitorModels._REPLACEMENT_CHAR);
    }

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