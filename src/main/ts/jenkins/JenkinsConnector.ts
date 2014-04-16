/// <reference path="../vendor/jquery.d.ts" />
import jQuery = require('jquery');
import Connector = require('connector/Connector');
import ConnectorBase = require('connector/ConnectorBase');
import CssClasses = require('CssClasses');
import JenkinsMonitorModel = require('jenkins/JenkinsMonitorModel');
import Configuration = require('configuration/Configuration');
import JenkinsJsonResponse = require('jsonInterfaces/JenkinsResponse');

/**
 * Get data from Jenkins {@link http://jenkins-ci.org/}
 */
class JenkinsConnector extends ConnectorBase implements Connector {

    private static _JOB_PREFIX: string = '/job/';

    /**
     * suffix that ensures that Jenkins returns JSONP
     */
    private static _JSONP_SUFFIX:string = '/api/json?jsonp=?';

    /**
     * suffix that tells Jenkins to only include certain properties in response
     */
    private static _JOB_STATUS_SUFFIX:string = '&tree=name,url,displayName,color,lastBuild[timestamp,building,duration,estimatedDuration,url,result,number,id,failCount,skipCount,totalCount,' +
        'actions[lastBuiltRevision[branch[SHA1,name]],failCount,skipCount,totalCount]]&depth=1';

    /**
     * suffix that tells Jenkins to only include certain properties of modules in response
     */
    private static _MODULES_STATUS_SUFFIX:string = '&tree=modules[name,url,displayName,color,' +
        'lastBuild[timestamp,actions[lastBuiltRevision[branch[SHA1,name]],failCount,skipCount,totalCount]]&depth=1';

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getRemoteData(model:JenkinsMonitorModel):void {
        jQuery.getJSON(this.getApiUrl(model),
                (json : JenkinsJsonResponse.Json) => {
                    JenkinsConnector.updateModel(json,model);
                })
            .fail((jqXHR, textStatus, errorThrown) => {
                if(console) {
                    console.log(jqXHR, textStatus, errorThrown, this.getApiUrl(model));
                }
            });

        //reload data periodically.
        setTimeout(() => this.getRemoteData(model), ConnectorBase.getRandomTimeout());
    }

    /**
     * Get Job URL for given model.
     * @param model
     * @returns string
     */
    public getJobUrl(model:JenkinsMonitorModel):string {
        return this.getUrl(model.getHostname(), JenkinsConnector._JOB_PREFIX + model.getExternalRef());
    }

    /**
     *
     * @param model
     * @returns string
     */
    public getApiUrl(model:JenkinsMonitorModel):string {
        return this.getJobUrl(model) + JenkinsConnector._JSONP_SUFFIX + JenkinsConnector._JOB_STATUS_SUFFIX;
    }

    //==================================================================================================================
    // Private
    //==================================================================================================================

    /**
     * Update Model with data retrieved from remote
     * @param json
     * @param model
     */
    private static updateModel(json : JenkinsJsonResponse.Json, model:JenkinsMonitorModel):void{
        model.setData(json);
    }

}

export = JenkinsConnector;