/// <reference path="../vendor/jquery.d.ts" />
import jQuery = require('jquery');
import SonarResponse = require('../jsonInterfaces/SonarResponse');
import Connector = require('../connector/Connector');
import ConnectorBase = require('../connector/ConnectorBase');
import Configuration = require('../configuration/Configuration');
import SonarMonitorModel = require('./SonarMonitorModel');
import SonarViolation = require('./SonarViolation');

/**
 *
 */
class SonarConnector extends ConnectorBase implements Connector {

    private static SONAR_DRILLDOWN_VIOLATIONS_SUFFIX:string = '/drilldown/violations/';
    private static SONAR_RESOURCE_VIOLATIONS_API_SUFFIX:string = '/api/resources?callback=?&format=json&metrics=blocker_violations,critical_violations,major_violations,minor_violations,info_violations&resource=';

    /**
     *
     * @param model
     */
    public getRemoteData(model:SonarMonitorModel):void {
        var moduleNames:string[] = model.id.split(',');

        moduleNames.forEach(moduleName => {
            var baseUrl = this.getUrl(model.hostname);

            var moduleUrl:string = baseUrl + SonarConnector.SONAR_DRILLDOWN_VIOLATIONS_SUFFIX + moduleName;
            model.addUrl(moduleName, moduleUrl);

            var apiUrl:string = baseUrl+ SonarConnector.SONAR_RESOURCE_VIOLATIONS_API_SUFFIX + moduleName;
            jQuery.getJSON(apiUrl,
                function(violations: SonarResponse.Jsons) {
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