/// <reference path="./vendor/jquery.d.ts" />
/// <reference path="./vendor/knockout.d.ts" />
import ko = require('knockout');
import jQuery = require('jquery');
import Types = require('./Types');
import MonitorModel = require('./monitorModel/MonitorModel');
import SectionModel = require('./SectionModel');
import Config = require('./jsonInterfaces/Config');
import Configuration = require('./configuration/Configuration');

//this global variable is set by the configuration JS.
declare var configJson:Config.Application;

/**
 * Main application class and Knockout ViewModel.
 * Accessible in View Layer as "$root"
 */
class ApplicationViewModel {

    private _title:KnockoutObservable<string> = ko.observable<string>();
    private _failureText:KnockoutObservable<string> = ko.observable<string>();
    private _isLoading:KnockoutObservable<boolean> = ko.observable<boolean>();
    private _configuration:KnockoutObservable<Configuration> = ko.observable<Configuration>();
    private _sections:KnockoutObservableArray<SectionModel> = ko.observableArray<SectionModel>();

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(configName:string) {
        //slower jQuery effects to save CPU power
        jQuery.fx.interval = 40;

        //we're still loading
        this._isLoading(true);

        var configParameter = ApplicationViewModel.getParameterByName('config');

        if(configParameter === '') {
            configParameter = configName;
        }

        //load configuration
        jQuery.getScript(configParameter)
            .always(()=>{
                //done loading
                this._isLoading(false);
            })
            .done(() => {
                this._title(configJson.title);

                if(configJson.configuration !== undefined) {
                    this._configuration(new Configuration(configJson.configuration));
                }

                configJson.sections.forEach((section:Config.Section) => {
                        this._sections.push(new SectionModel(section, this._configuration(), undefined))
                    }
                );
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this._failureText('Failure loading configuration from '+configParameter+'.\n'
                    +'jqXHR: '+ jqXHR+'\n'
                    +'textStatus: '+textStatus+'\n'
                    +'errorThrown: '+errorThrown);
                if(console) {
                    console.log(jqXHR, textStatus, errorThrown, 'Failure loading configuration from '+configParameter);
                }
            }
        );
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns string the application's title
     */
    public getTitle():string {
        return this._title();
    }

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns Array<SectionModel> the root sections
     */
    public getSections():Array<SectionModel> {
        return this._sections();
    }

    /**
     * @returns boolean true if external resources (e.g. the config.json) are still loading
     */
    public isLoading():boolean {
        return this._isLoading();
    }

    /**
     * @returns boolean true if external resources (e.g. the config.json) are still loading
     */
    public getFailureText():string {
        return this._failureText();
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
        if(this._configuration() !== undefined) {
            return this._configuration().getCustomCss();
        } else {
            return undefined;
        }
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    /**
     * Best answer from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
     */
    private static getParameterByName(name):string {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

export = ApplicationViewModel;