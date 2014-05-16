import Types = require('../util/Types');
import MonitorModel = require('./MonitorModel');
import MonitorViewModel = require('./MonitorViewModel');
import Config = require('../jsonInterfaces/Config.d');
import Configuration = require('../configuration/Configuration');
import Connectors = require('../connector/Connectors');
import SonarMonitorModel = require('../sonar/model/SonarMonitorModel');
import SonarMonitorViewModel = require('../sonar/viewModel/SonarMonitorViewModel');
import SonarConnector = require('../sonar/connector/SonarConnector');
import NagiosMonitorModel = require('../nagios/model/NagiosMonitorModel');
import NagiosMonitorViewModel = require('../nagios/viewModel/NagiosMonitorViewModel');
import NagiosConnector = require('../nagios/connector/NagiosConnector');
import JenkinsMonitorModel = require('../jenkins/model/JenkinsMonitorModel');
import JenkinsMonitorViewModel = require('../jenkins/viewModel/JenkinsMonitorViewModel');
import JenkinsConnector = require('../jenkins/connector/JenkinsConnector');

/**
 * This class contains static methods that help with MonitorModels.
 */
class MonitorModels {

    public static createViewModel(monitor:Config.Monitor, configuration:Configuration, hostname:string):MonitorViewModel {
        var model:MonitorModel = MonitorModels.createModel(monitor, configuration, hostname);
        var viewModel:MonitorViewModel = undefined;

        if(Types.isJenkins(monitor.type)) {
            viewModel = new JenkinsMonitorViewModel(<JenkinsMonitorModel>model);
        } else if(Types.isNagios(monitor.type)) {
            viewModel = new NagiosMonitorViewModel(<NagiosMonitorModel>model);
        } else if(Types.isSonar(monitor.type)) {
            viewModel = new SonarMonitorViewModel(<SonarMonitorModel>model);
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
            model = new JenkinsMonitorModel(monitor, <JenkinsConnector>Connectors.createConnector(configuration,Types.JENKINS), hostname);
        } else if(Types.isNagios(monitor.type)) {
            model = new NagiosMonitorModel(monitor, <NagiosConnector>Connectors.createConnector(configuration,Types.NAGIOS), hostname);
        } else if(Types.isSonar(monitor.type)) {
            model = new SonarMonitorModel(monitor, <SonarConnector>Connectors.createConnector(configuration,Types.SONAR), hostname);
        }

        return model;
    }

}

export = MonitorModels;