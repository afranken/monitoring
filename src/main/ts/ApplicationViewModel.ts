///ts:ref=jquery.d.ts
/// <reference path="./vendor/jquery.d.ts"/> ///ts:ref:generated
///ts:ref=knockout.d.ts
/// <reference path="./vendor/knockout.d.ts"/> ///ts:ref:generated
///ts:ref=Config.d.ts
/// <reference path="./jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:import=Types
import Types = require('./util/Types'); ///ts:import:generated
///ts:import=MonitorModel
import MonitorModel = require('./model/MonitorModel'); ///ts:import:generated
///ts:import=MonitorModels
import MonitorModels = require('./model/MonitorModels'); ///ts:import:generated
///ts:import=SectionModels
import SectionModels = require('./sections/SectionModels'); ///ts:import:generated
///ts:import=SectionViewModel
import SectionViewModel = require('./sections/SectionViewModel'); ///ts:import:generated
///ts:import=Configuration
import Configuration = require('./configuration/Configuration'); ///ts:import:generated
///ts:import=NavigatorMonitorViewModel
import NavigatorMonitorViewModel = require('./navigator/viewModel/NavigatorMonitorViewModel'); ///ts:import:generated

import Config = require('Config');
import ko = require('knockout');
import jQuery = require('jquery');

//this global variable is set by the configuration JS.
declare var configJson: Config.Application;

/**
 * Main application class and Knockout ViewModel.
 * Accessible in View Layer as "$root"
 */
class ApplicationViewModel {

    private _title: KnockoutObservable<string> = ko.observable<string>();
    private _failureText: KnockoutObservable<string> = ko.observable<string>();
    private _isLoading: KnockoutObservable<boolean> = ko.observable<boolean>();
    private _configuration: KnockoutObservable<Configuration> = ko.observable<Configuration>();
    private _sections: KnockoutObservableArray<SectionViewModel> = ko.observableArray<SectionViewModel>();
    private _navigator: KnockoutObservable<NavigatorMonitorViewModel> = ko.observable<NavigatorMonitorViewModel>();

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(configName: string) {
        //slower jQuery effects to save CPU power
        jQuery.fx.interval = 40;

        //we're still loading
        this._isLoading(true);

        var configParameter = ApplicationViewModel.getParameterByName('config');

        if (configParameter === '') {
            configParameter = configName;
        }

        //load configuration
        jQuery.getScript(configParameter)
            .always(() => {
                //done loading
                this._isLoading(false);
            })
            .done(() => {
                this._title(configJson.title);

                if (configJson.configuration !== undefined) {
                    this._configuration(new Configuration(configJson.configuration));
                }

                //TODO: add array at once to observableArray?
                SectionModels.createViewModels(configJson.sections, this._configuration(), undefined).forEach(
                    (section: SectionViewModel) => {
                        this._sections.push(section);
                    }
                );
                if (configJson.navigator) {
                    this._navigator(<NavigatorMonitorViewModel>MonitorModels.createViewModel(configJson.navigator, null, null));
                }
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this._failureText('Failure loading configuration from ' + configParameter + '.\n'
                    + 'jqXHR: ' + jqXHR + '\n'
                    + 'textStatus: ' + textStatus + '\n'
                    + 'errorThrown: ' + errorThrown);
                if (console) {
                    console.log(jqXHR, textStatus, errorThrown, 'Failure loading configuration from ' + configParameter);
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
    public getTitle(): string {
        return this._title();
    }

    /**
     * This method is only needed for Knockout view layer.
     *
     * @returns Array<SectionViewModel> the root sections
     */
    public getSections(): Array<SectionViewModel> {
        return this._sections();
    }

    public getNavigator(): NavigatorMonitorViewModel {
        return this._navigator();
    }

    /**
     * @returns boolean true if external resources (e.g. the config.json) are still loading
     */
    public isLoading(): boolean {
        return this._isLoading();
    }

    /**
     * @returns boolean true if external resources (e.g. the config.json) are still loading
     */
    public getFailureText(): string {
        return this._failureText();
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
    public getCustomCss(): string {
        if (this._configuration() !== undefined) {
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
    private static getParameterByName(name): string {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}

export = ApplicationViewModel;
