import MonitorModel = require('./MonitorModel');
import MonitorModels = require('./MonitorModels');
import Connector = require('./connector/Connector');
import Configuration = require('./configuration/Configuration');
import JenkinsMonitorModel = require('./jenkins/JenkinsMonitorModel');
import NagiosMonitorModel = require('./nagios/NagiosMonitorModel');
import SonarMonitorModel = require('./sonar/SonarMonitorModel');
import Config = require('./jsonInterfaces/Config');

class SectionModel {

    private _title:string;
    private _hostname:string;
    private _url:string;
    private _description:string;
    private _monitorModels: Array<MonitorModel> = [];
    private _sectionModels: Array<SectionModel> = [];

    constructor(section:Config.Section, configuration:Configuration, hostname: string) {
        this._title = section.title;
        this._url = section.url;
        this._description = section.description;
        this._hostname = section.hostname !== undefined ? section.hostname : hostname;

        this.init(section, configuration);
    }

    private init(section: Config.Section, configuration:Configuration) {
        if(section.sections !== undefined) {
            section.sections.forEach(subSection => {
                    this._sectionModels.push(new SectionModel(subSection, configuration, this._hostname));
                }
            );
        }

        if(section.monitors !== undefined) {
            section.monitors.forEach(monitor => {
                    this._monitorModels.push(MonitorModels.createModel(monitor, configuration, this._hostname));
                }
            );
        }
    }

    public getTitle():string {
        return this._title;
    }

    public getUrl():string {
        return this._url;
    }

    public getDescription():string {
        return this._description;
    }

    public getMonitorModels():Array<MonitorModel> {
        return this._monitorModels;
    }

    public getSections():Array<SectionModel> {
        return this._sectionModels;
    }

}

export = SectionModel;
