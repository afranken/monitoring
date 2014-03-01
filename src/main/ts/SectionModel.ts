import MonitorModel = require('./MonitorModel');
import MonitorModels = require('./MonitorModels');
import Connector = require('./connector/Connector');
import Configuration = require('./configuration/Configuration');
import JenkinsMonitorModel = require('./jenkins/JenkinsMonitorModel');
import NagiosMonitorModel = require('./nagios/NagiosMonitorModel');
import SonarMonitorModel = require('./sonar/SonarMonitorModel');
import Config = require('./jsonInterfaces/Config');

class SectionModel {

    public title:string;
    public url:string;
    public description:string;
    public monitorModels: Array<MonitorModel> = [];
    public sections: Array<SectionModel> = [];

    constructor(private section:Config.Section, private configuration:Configuration, private hostname: string) {
        this.title = section.title;
        this.url = section.url;
        this.description = section.description;
        this.hostname = section.hostname !== undefined ? section.hostname : hostname;

        this.init(section, configuration);
    }

    private init(section: Config.Section, configuration:Configuration) {
        if(section.sections !== undefined) {
            section.sections.forEach(subSection => {
                    this.sections.push(new SectionModel(subSection, configuration, this.hostname));
                }
            );
        }

        if(section.monitors !== undefined) {
            section.monitors.forEach(monitor => {
                    this.monitorModels.push(MonitorModels.createModel(monitor, configuration, this.hostname));
                }
            );
        }
    }

}

export = SectionModel;
