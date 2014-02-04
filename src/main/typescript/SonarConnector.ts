import Interfaces = require("JsonInterfaces");
import Connector = require("Connector");
import Configuration = require("Configuration");
import SonarModuleModel = require("SonarModuleModel");
import jQuery = require("jquery");

/**
 * TODO: clean up
 */
class SonarConnector implements Connector {

    private static SONAR_DRILLDOWN_VIOLATIONS_SUFFIX:string = "/sonar/drilldown/violations/";
    private static SONAR_RESOURCE_VIOLATIONS_API_SUFFIX:string = "/sonar/api/resources?callback=?&format=json&metrics=blocker_violations,critical_violations,major_violations,minor_violations,info_violations&resource=";

    private static BLOCKER:string = "blocker_violations";
    private static CRITICAL:string = "critical_violations";
    private static MAJOR:string = "major_violations";
    private static MINOR:string = "minor_violations";
    private static INFO:string = "info_violations";

    private static TYPES:string[] = [
        SonarConnector.BLOCKER,
        SonarConnector.CRITICAL,
        SonarConnector.MAJOR,
        SonarConnector.MINOR,
        SonarConnector.INFO];

    constructor(configuration) {

    }

    /**
     *
     * @param id
     * @param hostname
     * @param model
     */
    public getJson(id:string, hostname:string, model:SonarModuleModel):void {

        var that = this;
        model.url("http://" + hostname + SonarConnector.SONAR_DRILLDOWN_VIOLATIONS_SUFFIX + id);
        var apiUrl = "http://" + hostname + SonarConnector.SONAR_RESOURCE_VIOLATIONS_API_SUFFIX + id;

        jQuery.getJSON(apiUrl,
            function(violations: Interfaces.SonarViolations) {

                SonarConnector.TYPES.forEach(type => {

                    var count = that.getViolationCount(violations,type);
                    var status = SonarConnector.getViolationStatus(count,type);
                    if(type === SonarConnector.BLOCKER) {
                        model.blocker(count);
                        model.blockerStatus(status);
                    } else if(type === SonarConnector.CRITICAL) {
                        model.critical(count);
                        model.criticalStatus(status);
                    } else if(type === SonarConnector.MAJOR) {
                        model.major(count);
                        model.majorStatus(status);
                    } else if(type === SonarConnector.MINOR) {
                        model.minor(count);
                        model.minorStatus(status);
                    } else if(type === SonarConnector.INFO) {
                        model.info(count);
                        model.infoStatus(status);
                    }
                });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown, apiUrl);
        });
    }

    /**
     *
     * @param count
     * @param type
     * @returns {*}
     */
    private static getViolationStatus(count:number, type:string): string{
        var status;
        if(count > 0) {
            if(type === SonarConnector.BLOCKER || type === SonarConnector.CRITICAL) {
                status = SonarModuleModel.BASIC_CLASSES + "alert-danger";
            } else {
                status = SonarModuleModel.BASIC_CLASSES + "alert-warning";
            }
        } else {
            status = SonarModuleModel.BASIC_CLASSES + "alert-success";
        }

        return status;
    }

    /**
     *
     * @param violations
     * @param violationType
     * @returns {number}
     */
    private getViolationCount(violations: Interfaces.SonarViolations, violationType: string):number {
        var vio: number = 0;
        violations[0].msr.forEach(violation => {
            if(violationType === violation.key) {
                //in some versions of Sonar, values will be formatted "789.0" instead of "789"
                if(violation.val.toString().indexOf('.')>0) {
                    vio = parseInt(violation.val.toString().substring(0,violation.val.toString().indexOf('.')));
                } else {
                    vio = violation.val;
                }
            }
        });

        return vio;
    }
}

export = SonarConnector;