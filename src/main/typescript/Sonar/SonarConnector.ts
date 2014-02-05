import Interfaces = require("../JsonInterfaces.d");
import Connector = require("../Connector");
import Configuration = require("../Configuration/Configuration");
import SonarModuleModel = require("SonarModuleModel");
import SonarViolation = require("SonarViolation");
import jQuery = require("jquery");

/**
 * TODO: clean up
 */
class SonarConnector implements Connector {

    private static SONAR_DRILLDOWN_VIOLATIONS_SUFFIX:string = "/sonar/drilldown/violations/";
    private static SONAR_RESOURCE_VIOLATIONS_API_SUFFIX:string = "/sonar/api/resources?callback=?&format=json&metrics=blocker_violations,critical_violations,major_violations,minor_violations,info_violations&resource=";

    constructor(configuration) {}

    /**
     *
     * @param id
     * @param hostname
     * @param model
     */
    public getJson(id:string, hostname:string, model:SonarModuleModel):void {

        model.url("http://" + hostname + SonarConnector.SONAR_DRILLDOWN_VIOLATIONS_SUFFIX + id);
        var apiUrl = "http://" + hostname + SonarConnector.SONAR_RESOURCE_VIOLATIONS_API_SUFFIX + id;

        jQuery.getJSON(apiUrl,
            function(violations: Interfaces.SonarViolations) {

                model.violations.forEach(violation => {
                    violation.setCount(violations);
                    violation.setStatus(violation.count());
                });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown, apiUrl);
        });
    }

}

export = SonarConnector;