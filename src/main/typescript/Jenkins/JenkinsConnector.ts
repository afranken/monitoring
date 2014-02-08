/// <reference path="../vendor/jquery.d.ts" />
import Connector = require('../Connector');
import CssClasses = require('../CssClasses');
import JenkinsMonitorModel = require('./JenkinsMonitorModel');
import Configuration = require('../Configuration/Configuration');
import JenkinsJsonResponse = require('../JsonInterfaces/JenkinsResponse');
import jQuery = require('jquery');

class JenkinsConnector implements Connector {

    private static OPACITY = 'opacity: ';
    public static BASIC_STYLE:string = JenkinsConnector.OPACITY +'1.0';

    private static JOB_PREFIX: string = '/job/';

    //suffix that ensures that Jenkins returns JSONP
    private static JSONP_SUFFIX:string = '/api/json?jsonp=?';

    //suffix that tells Jenkins to only include certain properties in response
    private static JOB_STATUS_SUFFIX:string = '&tree=lastBuild[timestamp],name,color&depth=1';

    //suffix that tells Jenkins to only include certain properties of modules in response
    private static MODULES_STATUS_SUFFIX:string = '&tree=modules[name,url,displayName,color,lastBuild[timestamp]]&depth=1';


    constructor(private configuration: Configuration) {}

    public getJson(id:string, hostname:string, model:JenkinsMonitorModel):void {
        var jobUrl = this.configuration.getProtocol(hostname) + hostname + JenkinsConnector.JOB_PREFIX + id;
        model.url(jobUrl);
        var apiUrl = jobUrl + JenkinsConnector.JSONP_SUFFIX + JenkinsConnector.JOB_STATUS_SUFFIX;
        jQuery.getJSON(apiUrl,
                (json : JenkinsJsonResponse.JenkinsJson) => {
                    model.status(CssClasses.BASIC_CLASSES + JenkinsConnector.translateColor(json.color));
                    model.style(JenkinsConnector.OPACITY+JenkinsConnector.calculateExpiration(json.lastBuild.timestamp, this.configuration.getExpiry()));
                })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown, apiUrl);
            });
    }

    /**
     *
     * @param buildTimestamp
     * @returns {*}
     * @param expiry
     */
    private static calculateExpiration(buildTimestamp: number, expiry: number):number {

        var expireStyle;

        //calculate timestamp and expiration
        var nowTimestamp = new Date().getTime();
        var ageMinutes = Math.round(nowTimestamp - buildTimestamp) / (1000 * 60);
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

    //translate colors from Jenkins to bootstrap styles
    private static translateColor(color:string):string {
        var colorTranslation;
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