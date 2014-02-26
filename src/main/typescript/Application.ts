/// <reference path="./vendor/jquery.d.ts" />
/// <reference path="./vendor/knockout.d.ts" />
import ko = require('knockout');
import jQuery = require('jquery');
import MonitorModel = require('./MonitorModel');
import SectionModel = require('./SectionModel');
import Config = require('./JsonInterfaces/Config');
import Connector = require('./Connector/Connector');
import CssClasses = require('./CssClasses');
import Configuration = require('./Configuration/Configuration');
import JenkinsConnector = require('./Jenkins/JenkinsConnector');
import JenkinsMonitorModel = require('./Jenkins/JenkinsMonitorModel');
import SonarMonitorModel = require('./Sonar/SonarMonitorModel');
import SonarConnector = require('./Sonar/SonarConnector');
import NagiosConnector = require('./Nagios/NagiosConnector');
import NagiosMonitorModel = require('./Nagios/NagiosMonitorModel');

/**
 * Main application class
 */
class ApplicationViewModel {

    public title:string;
    public configuration: Configuration;
    public sections: Array<SectionModel> = [];
    public connectors: { [type: string]: Connector; } = { };

    constructor(private json:Config.Application) {
        this.title = json.title;
        if(json.configuration !== undefined) {
            this.configuration = new Configuration(json.configuration);
        }

        this.init(json);
    }

    /**
     * Trigger {@link MonitorModel.updateStatus()} in Knockout's "afterRender" binding.
     *
     * @param node the currently rendered DOM node
     * @param monitor the MonitorModel that is rendered
     */
    public getData(node: Node, monitor: MonitorModel):void {
        monitor.updateStatus();
    }

    /**
     * Initialize
     * @param json Config.Application
     */
    private init(json: Config.Application) {

        //create connectors
        this.connectors[JenkinsMonitorModel.TYPE] = new JenkinsConnector(this.configuration);
        this.connectors[SonarMonitorModel.TYPE] = new SonarConnector(this.configuration);
        this.connectors[NagiosMonitorModel.TYPE] = new NagiosConnector(this.configuration);

        json.sections.forEach(section => {
                this.sections.push(new SectionModel(section, this.connectors, undefined))
            }
        );

        this.registerPulsateBindingHandler();
    }

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
                        jQuery(element).animate({opacity: "toggle"}, {duration: 1500}).animate({opacity: "toggle"}, {duration: 1500});
                    }
                }
            }
        }
    }
}

export = ApplicationViewModel;