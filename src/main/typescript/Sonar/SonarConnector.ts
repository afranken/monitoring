/// <reference path="../vendor/jquery.d.ts" />
import jQuery = require('jquery');
import SonarResponse = require('../JsonInterfaces/SonarResponse');
import Connector = require('../Connector');
import Configuration = require('../Configuration/Configuration');
import SonarMonitorModel = require('./SonarMonitorModel');
import SonarViolation = require('./SonarViolation');

/**
 * TODO: clean up
 */
class SonarConnector implements Connector {

    private static SONAR_DRILLDOWN_VIOLATIONS_SUFFIX:string = '/drilldown/violations/';
    private static SONAR_RESOURCE_VIOLATIONS_API_SUFFIX:string = '/api/resources?callback=?&format=json&metrics=blocker_violations,critical_violations,major_violations,minor_violations,info_violations&resource=';

    constructor(private configuration: Configuration) {}

    /**
     *
     * @param id
     * @param hostname
     * @param model
     */
    public getJson(id:string, hostname:string, model:SonarMonitorModel):void {
        var moduleNames: string[] = id.split(',');
        var protocol = this.configuration.getProtocol(hostname);
        var prefix = this.configuration.getPrefix(hostname);

        moduleNames.forEach(moduleName => {
            model.addUrl(moduleName, protocol + hostname + prefix + SonarConnector.SONAR_DRILLDOWN_VIOLATIONS_SUFFIX + moduleName);

            var apiUrl = protocol + hostname + prefix + SonarConnector.SONAR_RESOURCE_VIOLATIONS_API_SUFFIX + moduleName;
            jQuery.getJSON(apiUrl,
                function(violations: SonarResponse.SonarJsons) {
                    var violationName = violations[0].name;
                    model.addName(moduleName,violationName);
                    model.addViolations(moduleName,violations);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown, apiUrl);
                });
        });
    }

}

export = SonarConnector;