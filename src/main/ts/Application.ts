/// <reference path="./vendor/jquery.d.ts" />
/// <reference path="./vendor/knockout.d.ts" />
import ko = require('knockout');
import jQuery = require('jquery');
import Types = require('./Types');
import MonitorModel = require('./monitorModel/MonitorModel');
import SectionModel = require('./SectionModel');
import Config = require('./jsonInterfaces/Config');
import Connector = require('./connector/Connector');
import CssClasses = require('./CssClasses');
import Configuration = require('./configuration/Configuration');
import JenkinsConnector = require('./jenkins/JenkinsConnector');
import JenkinsMonitorModel = require('./jenkins/JenkinsMonitorModel');
import SonarMonitorModel = require('./sonar/SonarMonitorModel');
import SonarConnector = require('./sonar/SonarConnector');
import NagiosConnector = require('./nagios/NagiosConnector');
import NagiosMonitorModel = require('./nagios/NagiosMonitorModel');

/**
 * Main application class and Knockout ViewModel.
 * Accessible in View Layer as "$root"
 */
class ApplicationViewModel {

    private _title:string;
    private _configuration: Configuration;
    private _sections: Array<SectionModel> = [];

    constructor(private json:Config.Application) {
        this._title = json.title;
        if(json.configuration !== undefined) {
            this._configuration = new Configuration(json.configuration);
        }

        json.sections.forEach(section => {
                this._sections.push(new SectionModel(section, this._configuration, undefined))
            }
        );
    }

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns string the application's title
     */
    public getTitle():string {
        return this._title;
    }

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns Array<SectionModel> the root sections
     */
    public getSections():Array<SectionModel> {
        return this._sections;
    }

    /**
     * This method is only needed for Knockout view layer.
     * Used to trigger {@link MonitorModel.updateStatus()} in Knockout's "afterRender" binding.
     *
     * @param node the currently rendered DOM node
     * @param monitor the MonitorModel that is rendered
     */
    public getData(node: Node, monitor: MonitorModel):void {
        monitor.updateStatus();
    }

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns Types
     */
    public getTypes():Types {
        return Types;
    }

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns string a relative URI to a CSS file.
     */
    public getCustomCss():string {
        return this._configuration.getCustomCss();
    }
}

export = ApplicationViewModel;