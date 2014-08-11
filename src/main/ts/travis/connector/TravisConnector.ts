///ts:ref=jquery.d.ts
/// <reference path="../../vendor/jquery.d.ts"/> ///ts:ref:generated
///ts:ref=TravisResponse.d.ts
/// <reference path="../../jsonInterfaces/TravisResponse.d.ts"/> ///ts:ref:generated
///ts:import=Connector
import Connector = require('../../connector/Connector'); ///ts:import:generated
///ts:import=ConnectorBase
import ConnectorBase = require('../../connector/ConnectorBase'); ///ts:import:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../model/TravisMonitorModel'); ///ts:import:generated

/**
 * Get data from Travis {@link http://travis-ci.org/}
 */
class TravisConnector extends ConnectorBase implements Connector {


    private static _HOST_PREFIX = 'api.';

    /**
     *
     */
    private static _REPOSITORY_PREFIX: string = '/repositories/';
    private static _BUILDS_PREFIX: string = '/builds/';

    /**
     * suffix that ensures that Jenkins returns JSONP
     */
    private static _BUILDS_SUFFIX: string = '/builds.json';


    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getRemoteData(model: TravisMonitorModel): void {
        jQuery.getJSON(this.getApiUrl(model),
            (json: TravisJsonResponse.Json[]) => {
                TravisConnector.updateModel(json, model);
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                if (console) {
                    console.log(jqXHR, textStatus, errorThrown, this.getApiUrl(model));
                }
            });

        //reload data periodically.
        setTimeout(() => this.getRemoteData(model), ConnectorBase.getRandomTimeout());
    }

    /**
     * Get Job URL for given model.
     * @param model
     * @param build
     * @returns string
     */
    public getBuildUrl(model: TravisMonitorModel, build: TravisJsonResponse.Json): string {
        return this.getUrl(model.getHostname(), '/' + model.getExternalRef() + TravisConnector._BUILDS_PREFIX + model.getLastBuild().id);
    }

    /**
     * Get Job URL for given model.
     * @param model
     * @returns string
     */
    public getJobUrl(model: TravisMonitorModel): string {
        return this.getUrl(model.getHostname(), '/' + model.getExternalRef());
    }

    /**
     *
     * @param model
     * @returns string
     */
    public getApiUrl(model: TravisMonitorModel): string {
        return this.getUrl(model.getHostname(), TravisConnector._REPOSITORY_PREFIX + model.getExternalRef(),
            TravisConnector._HOST_PREFIX) + TravisConnector._BUILDS_SUFFIX;
    }

    //==================================================================================================================
    // Private
    //==================================================================================================================

    /**
     * Update Model with data retrieved from remote
     * @param json
     * @param model
     */
    private static updateModel(json: TravisJsonResponse.Json[], model: TravisMonitorModel): void {
        model.setData(json);
    }

}

export = TravisConnector;
