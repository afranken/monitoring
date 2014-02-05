/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../vendor/knockout.d.ts" />
import JsonInterfaces = require("../JsonInterfaces");
import Connector = require("../Connector");
import JenkinsJobModel = require("./JenkinsJobModel");
import Configuration = require("../Configuration/Configuration");
import jQuery = require("jquery");

class JenkinsConnector implements Connector {

    private configuration:JsonInterfaces.Settings;

    public static BASIC_CLASSES:string = "jobstatus alert ";

    private static OPACITY = "opacity: ";
    public static BASIC_STYLE:string = JenkinsConnector.OPACITY +"1.0";

    //suffix that ensures that Jenkins returns JSONP
    private static JSONP_SUFFIX:string = "/api/json?jsonp=?";

    //suffix that tells Jenkins to only include certain properties in response
    private static JOB_STATUS_SUFFIX:string = "&tree=lastBuild[timestamp],name,color&depth=1";

    //suffix that tells Jenkins to only include certain properties of modules in response
    private static MODULES_STATUS_SUFFIX:string = "&tree=modules[name,url,displayName,color,lastBuild[timestamp]]&depth=1";


    constructor(configuration: JsonInterfaces.Settings) {
        this.configuration = configuration;
    }

    getJson(url:string, hostname:string, model:JenkinsJobModel):void {

        var self = this;



        var jobUrl = url + JenkinsConnector.JSONP_SUFFIX + JenkinsConnector.JOB_STATUS_SUFFIX;
        jQuery.getJSON(jobUrl,
                function (json) {
                    model.status(JenkinsConnector.BASIC_CLASSES + JenkinsConnector.translateColor(json.color));
                    model.style(JenkinsConnector.OPACITY+self.applyExpiration(json.lastBuild.timestamp));
                })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown, jobUrl);
            });

    }

    private applyExpiration(buildTimestamp):number {

        var expireStyle;

        //calculate timestamp and expiration
        var nowTimestamp = new Date().getTime();
        var ageMinutes = Math.round(nowTimestamp - buildTimestamp) / (1000 * 60);
        var expiredPercent = 1 - (ageMinutes / (this.configuration.expiry * 60));  // 0=expired, 1=fresh

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
            colorTranslation = "alert-success";
        }
        else if (color === 'red') {
            colorTranslation = "alert-danger";
        }
        else if (color === 'yellow') {
            colorTranslation = "alert-warning";
        }
        else if (color === 'yellow_anime') {
            colorTranslation = "status-building alert-warning";
        }
        else if (color === 'red_anime') {
            colorTranslation = "status-building alert-danger";
        }
        else if (color === 'blue_anime') {
            colorTranslation = "status-building alert-success";
        }
        else {
            colorTranslation = "alert-disabled";
        }
        return colorTranslation;
    }

}

export = JenkinsConnector;