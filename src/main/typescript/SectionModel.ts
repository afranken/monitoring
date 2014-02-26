import MonitorModel = require('./MonitorModel');
import Connector = require('./Connector/Connector');
import JenkinsMonitorModel = require('./Jenkins/JenkinsMonitorModel');
import NagiosMonitorModel = require('./Nagios/NagiosMonitorModel');
import SonarMonitorModel = require('./Sonar/SonarMonitorModel');
import Config = require('./JsonInterfaces/Config');

class SectionModel {

    public title:string;
    public url:string;
    public description:string;
    public monitorModels: Array<MonitorModel> = [];
    public sections: Array<SectionModel> = [];

    constructor(private section:Config.Section, private connectors: {[type: string]: Connector}, private hostname: string) {
        this.title = section.title;
        this.url = section.url;
        this.description = section.description;
        this.hostname = section.hostname !== undefined ? section.hostname : hostname;

        this.init(section, connectors);
    }

    private init(section: Config.Section, connectors: {[type: string]: Connector}) {
        if(section.sections !== undefined) {
            section.sections.forEach(subSection => {
                    var sectionViewModel = new SectionModel(subSection, connectors, this.hostname);
                    this.sections.push(sectionViewModel);
                }
            );
        }

        if(section.monitors !== undefined) {
            section.monitors.forEach(monitor => {
                    var monitorModel;
                    if(monitor.type === undefined || monitor.type === JenkinsMonitorModel.TYPE) {
                        monitorModel = new JenkinsMonitorModel(monitor, connectors[JenkinsMonitorModel.TYPE], this.hostname);
                    } else if(monitor.type === NagiosMonitorModel.TYPE) {
                        monitorModel = new NagiosMonitorModel(monitor, connectors[NagiosMonitorModel.TYPE], this.hostname);
                    } else if(monitor.type === SonarMonitorModel.TYPE) {
                        monitorModel = new SonarMonitorModel(monitor, connectors[SonarMonitorModel.TYPE], this.hostname);
                    }

                    this.monitorModels.push(monitorModel);
                }
            );
        }
    }

}

export = SectionModel;
