import Types = require('../util/Types');
import MonitorModel = require('./MonitorModel');
import MonitorViewModel = require('./MonitorViewModel');
import Config = require('../jsonInterfaces/Config.d');
import Configuration = require('../configuration/Configuration');
import Connector = require('../connector/Connector');
import Connectors = require('../connector/Connectors');
import SonarMonitorModel = require('../sonar/SonarMonitorModel');
import NagiosMonitorModel = require('../nagios/NagiosMonitorModel');
import JenkinsMonitorModel = require('../jenkins/model/JenkinsMonitorModel');
import JenkinsMonitorViewModel = require('../jenkins/viewModel/JenkinsMonitorViewModel');

/**
 * This class contains static methods that help with MonitorModels.
 */
class MonitorModels {

    public static createViewModel(monitor:Config.Monitor, configuration:Configuration, hostname:string):MonitorViewModel {
        var model:MonitorModel = undefined;
        var viewModel:MonitorViewModel = undefined;

        if(Types.isJenkins(monitor.type)) {
            model = MonitorModels.createModel(monitor, configuration, hostname);
            viewModel = new JenkinsMonitorViewModel(model);
        } else if(Types.isNagios(monitor.type)) {
            model = new NagiosMonitorModel(monitor, Connectors.createConnector(configuration,Types.NAGIOS), hostname);
            viewModel = new NagiosMonitorModel(monitor, Connectors.createConnector(configuration,Types.NAGIOS), hostname);
        } else if(Types.isSonar(monitor.type)) {
            model = new SonarMonitorModel(monitor, Connectors.createConnector(configuration,Types.SONAR), hostname);
            viewModel = new SonarMonitorModel(monitor, Connectors.createConnector(configuration,Types.SONAR), hostname);
        }

        return viewModel;
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