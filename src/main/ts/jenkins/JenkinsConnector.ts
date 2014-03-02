/// <reference path="../vendor/jquery.d.ts" />
import jQuery = require('jquery');
import Connector = require('../connector/Connector');
import ConnectorBase = require('../connector/ConnectorBase');
import CssClasses = require('../CssClasses');
import JenkinsMonitorModel = require('./JenkinsMonitorModel');
import Configuration = require('../configuration/Configuration');
import JenkinsJsonResponse = require('../jsonInterfaces/JenkinsResponse');

/**
 * Get data from Jenkins {@link http://jenkins-ci.org/}
 */
class JenkinsConnector extends ConnectorBase implements Connector {

    private static OPACITY:string = 'opacity: ';
    /**
     * Default: completely visible
     */
    public static BASIC_STYLE:string = JenkinsConnector.OPACITY +'1.0';

    private static JOB_PREFIX: string = '/job/';

    /**
     * suffix that ensures that Jenkins returns JSONP
     */
    private static JSONP_SUFFIX:string = '/api/json?jsonp=?';

    /**
     * suffix that tells Jenkins to only include certain properties in response
     */
    private static JOB_STATUS_SUFFIX:string = '&tree=name,url,displayName,color,lastBuild[timestamp,building,duration,url,result,number,id,failCount,skipCount,totalCount,' +
        'actions[lastBuiltRevision[branch[SHA1,name]]]]&depth=1';

    /**
     * suffix that tells Jenkins to only include certain properties of modules in response
     */
    private static MODULES_STATUS_SUFFIX:string = '&tree=modules[name,url,displayName,color,' +
        'lastBuild[timestamp,actions[lastBuiltRevision[branch[SHA1,name]],failCount,skipCount,totalCount]]&depth=1';

    public getRemoteData(model:JenkinsMonitorModel):void {
        jQuery.getJSON(this.getApiUrl(model),
                (json : JenkinsJsonResponse.JenkinsJson) => {
                    this.updateModel(json, model);
                })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR, textStatus, errorThrown, this.getApiUrl(model));
            });
    }

    /**
     * Update Model with data retrieved from remote
     * @param json
     * @param model
     */
    private updateModel(json : JenkinsJsonResponse.JenkinsJson, model:JenkinsMonitorModel):void{
        model.url(this.getJobUrl(model));
        model.status(CssClasses.BASIC_CLASSES + JenkinsConnector.translateColor(json.color));
        model.style(JenkinsConnector.OPACITY+JenkinsConnector.calculateExpiration(json.lastBuild.timestamp, this.getExpiry()));
    }

    /**
     * Get Job URL for given model.
     * @param model
     * @returns string
     */
    public getJobUrl(model:JenkinsMonitorModel):string {
        return this.getUrl(model.hostname, JenkinsConnector.JOB_PREFIX + model.id);
    }

    /**
     *
     * @param model
     * @returns string
     */
    public getApiUrl(model:JenkinsMonitorModel):string {
        return this.getJobUrl(model) + JenkinsConnector.JSONP_SUFFIX + JenkinsConnector.JOB_STATUS_SUFFIX;
    }

    /**
     * Get expiration based on the amount of time that passed between the {@link JenkinsJsonResponse.LastBuild.timestamp} and now.
     *
     * @param expiry time in hours
     * @param buildTimestamp
     *
     * @returns number between 0.25 (=expired) and 1.0 (job ran recently)
     */
    private static calculateExpiration(buildTimestamp: number, expiry: number):number {

        var expireStyle:number;

        //calculate timestamp and expiration
        var nowTimestamp:number = new Date().getTime();
        var ageMinutes:number = Math.round(nowTimestamp - buildTimestamp) / (1000 * 60);
        var expiredPercent = 1 - (ageMinutes / (expiry * 60));  // 0=expired, 1=fresh

        if (expiredPercent < 0) {

            // age has exceeded ttl
            expireStyle = 0.25;
        }
        else {

            // age is within ttl
            expireStyle = 0.5 + (expiredPercent * 0.5);
        }

        return expireStyle;
    }

    /**
     * Translate colors from Jenkins to twitter bootstrap styles
     * @param color
     * @returns string
     */
    private static translateColor(color:string):string {
        var colorTranslation:string;
        if (color === 'blue') {
            colorTranslation = CssClasses.SUCCESS;
        }
        else if (color === 'red') {
            colorTranslation = CssClasses.FAILURE;
        }
        else if (color === 'yellow') {
            colorTranslation = CssClasses.WARNING;
        }
        else if (color === 'yellow_anime') {
            colorTranslation = CssClasses.BUILDING+CssClasses.WARNING;
        }
        else if (color === 'red_anime') {
            colorTranslation = CssClasses.BUILDING+CssClasses.FAILURE;
        }
        else if (color === 'blue_anime') {
            colorTranslation = CssClasses.BUILDING+CssClasses.SUCCESS;
        }
        else {
            colorTranslation = CssClasses.DISABLED;
        }
        return colorTranslation;
    }

}

export = JenkinsConnector;