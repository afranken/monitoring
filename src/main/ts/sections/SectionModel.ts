import MonitorModel = require('../monitorModel/MonitorModel');
import MonitorModels = require('../monitorModel/MonitorModels');
import Connector = require('../connector/Connector');
import Configuration = require('../configuration/Configuration');
import JenkinsMonitorModel = require('../jenkins/JenkinsMonitorModel');
import NagiosMonitorModel = require('../nagios/NagiosMonitorModel');
import SonarMonitorModel = require('../sonar/SonarMonitorModel');
import Config = require('../jsonInterfaces/Config');

/**
 * This class represents a section.
 * Sections are used to structure the layout into rows and columns.
 */
class SectionModel {

    private _title:string;
    private _hostname:string;
    private _url:string;
    private _description:string;

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(section:Config.Section, hostname: string) {
        this._title = section.title;
        this._url = section.url;
        this._description = section.description;
        this._hostname = section.hostname !== undefined ? section.hostname : hostname;
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getTitle():string {
        return this._title;
    }

    public getUrl():string {
        return this._url;
    }

    public getDescription():string {
        return this._description;
    }

    public getHostname():string {
        return this._hostname;
    }

}

export = SectionModel;