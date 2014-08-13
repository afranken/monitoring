///ts:ref=Config.d.ts
/// <reference path="../jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:import=Types
import Types = require('../util/Types'); ///ts:import:generated
///ts:import=MonitorModel
import MonitorModel = require('./MonitorModel'); ///ts:import:generated
///ts:import=MonitorViewModel
import MonitorViewModel = require('./MonitorViewModel'); ///ts:import:generated
///ts:import=Configuration
import Configuration = require('../configuration/Configuration'); ///ts:import:generated
///ts:import=Connectors
import Connectors = require('../connector/Connectors'); ///ts:import:generated
///ts:import=SonarMonitorModel
import SonarMonitorModel = require('../sonar/model/SonarMonitorModel'); ///ts:import:generated
///ts:import=SonarMonitorViewModel
import SonarMonitorViewModel = require('../sonar/viewModel/SonarMonitorViewModel'); ///ts:import:generated
///ts:import=SonarConnector
import SonarConnector = require('../sonar/connector/SonarConnector'); ///ts:import:generated
///ts:import=NagiosMonitorModel
import NagiosMonitorModel = require('../nagios/model/NagiosMonitorModel'); ///ts:import:generated
///ts:import=NagiosMonitorViewModel
import NagiosMonitorViewModel = require('../nagios/viewModel/NagiosMonitorViewModel'); ///ts:import:generated
///ts:import=NagiosConnector
import NagiosConnector = require('../nagios/connector/NagiosConnector'); ///ts:import:generated
///ts:import=NavigatorMonitorModel
import NavigatorMonitorModel = require('../navigator/model/NavigatorMonitorModel'); ///ts:import:generated
///ts:import=NavigatorMonitorViewModel
import NavigatorMonitorViewModel = require('../navigator/viewModel/NavigatorMonitorViewModel'); ///ts:import:generated
///ts:import=JenkinsMonitorModel
import JenkinsMonitorModel = require('../jenkins/model/JenkinsMonitorModel'); ///ts:import:generated
///ts:import=JenkinsMonitorViewModel
import JenkinsMonitorViewModel = require('../jenkins/viewModel/JenkinsMonitorViewModel'); ///ts:import:generated
///ts:import=JenkinsConnector
import JenkinsConnector = require('../jenkins/connector/JenkinsConnector'); ///ts:import:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../travis/model/TravisMonitorModel'); ///ts:import:generated
///ts:import=TravisMonitorViewModel
import TravisMonitorViewModel = require('../travis/viewModel/TravisMonitorViewModel'); ///ts:import:generated
///ts:import=TravisConnector
import TravisConnector = require('../travis/connector/TravisConnector'); ///ts:import:generated


/**
 * This class contains static methods that help with MonitorModels.
 */
class MonitorModels {

    public static createViewModel(monitor: Config.Monitor, configuration: Configuration, hostname: string): MonitorViewModel {
        var model: MonitorModel = MonitorModels.createModel(monitor, configuration, hostname);
        model.updateStatus();
        var viewModel: MonitorViewModel = undefined;

        if (Types.isJenkins(monitor.type)) {
            viewModel = new JenkinsMonitorViewModel(<JenkinsMonitorModel>model);
        } else if (Types.isNagios(monitor.type)) {
            viewModel = new NagiosMonitorViewModel(<NagiosMonitorModel>model);
        } else if (Types.isSonar(monitor.type)) {
            viewModel = new SonarMonitorViewModel(<SonarMonitorModel>model);
        } else if (Types.isTravis(monitor.type)) {
            viewModel = new TravisMonitorViewModel(<TravisMonitorModel>model);
        } else if (Types.isNavigator(monitor.type)) {
            viewModel = new NavigatorMonitorViewModel(<NavigatorMonitorModel>model);
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
    public static createModel(monitor: Config.Monitor, configuration: Configuration, hostname: string): MonitorModel {
        var model: MonitorModel = undefined;

        if (Types.isJenkins(monitor.type)) {
            model = new JenkinsMonitorModel(monitor, <JenkinsConnector>Connectors.createConnector(configuration, Types.JENKINS), hostname);
        } else if (Types.isNagios(monitor.type)) {
            model = new NagiosMonitorModel(monitor, <NagiosConnector>Connectors.createConnector(configuration, Types.NAGIOS), hostname);
        } else if (Types.isSonar(monitor.type)) {
            model = new SonarMonitorModel(monitor, <SonarConnector>Connectors.createConnector(configuration, Types.SONAR), hostname);
        } else if (Types.isTravis(monitor.type)) {
            model = new TravisMonitorModel(monitor, <TravisConnector>Connectors.createConnector(configuration, Types.TRAVIS), hostname);
        } else if (Types.isNavigator(monitor.type)) {
            model = new NavigatorMonitorModel(monitor);
        }

        return model;
    }

}

export = MonitorModels;
