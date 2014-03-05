/// <reference path="./vendor/jquery.d.ts" />
/// <reference path="./vendor/knockout.d.ts" />
import ko = require('knockout');
import jQuery = require('jquery');
import Types = require('./Types');
import MonitorModel = require('./MonitorModel');
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

        this.registerPulsateBindingHandler();
    }

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns string
     */
    public getTitle() {
        return this._title;
    }

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns Array<SectionModel>
     */
    public getSections() {
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
    public getTypes(): Types {
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

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns string a relative URI to a CSS theme file.
     */
    public getThemeCss():string {
        return this._configuration.getThemeCss();
    }

    //==================================================================================================================

    /**
     * Register custom handler "pulsate".
     * Usage: data-bind="pulsate: <observable property>"
     * If observable property contains {@link CssClasses.BUILDING}, DOM Element will start to pulsate.
     */
    private registerPulsateBindingHandler(): void {
        ko.bindingHandlers.pulsate = {
            update: function(element: Node, valueAccessor, allBindings) {
                // First get the latest data that we're bound to
                var value = valueAccessor();

                // Next, whether or not the supplied model property is observable, get its current value
                var valueUnwrapped: string = ko.unwrap(value);

                // Now manipulate the DOM element
                if (~valueUnwrapped.indexOf(CssClasses.BUILDING)) {
                    //add pulsating effect for jobs that are currently running
                    for(var i = 0; i < 500; i++) {
                        jQuery(element).animate({opacity: "toggle"}, {duration: 1500})
                                       .animate({opacity: "toggle"}, {duration: 1500});
                    }
                }
            }
        }
    }
}

export = ApplicationViewModel;