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

            model.addUrl(moduleName, this.getModuleUrl(model,moduleName));

            var apiUrl:string = baseUrl+ SonarConnector.SONAR_RESOURCE_VIOLATIONS_API_SUFFIX + moduleName;
            jQuery.getJSON(this.getApiUrl(model,moduleName),
                (violations: SonarResponse.Jsons) => {
                    SonarConnector.updateModel(violations, model, moduleName);
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    console.log(jqXHR, textStatus, errorThrown, this.getApiUrl(model,moduleName));
                });
        });
    }

    public static updateModel(json:SonarResponse.Jsons, model:SonarMonitorModel, moduleName:string):void {
        var violationName = json[0].name;
        model.addName(moduleName,violationName);
        model.addViolations(moduleName,json);
    }

    public getApiUrl(model:SonarMonitorModel, moduleName:string):string {
        return this.getUrl(model.hostname) + SonarConnector.SONAR_RESOURCE_VIOLATIONS_API_SUFFIX + moduleName
    }

    public getModuleUrl(model:SonarMonitorModel, moduleName:string):string {
        return this.getUrl(model.hostname) + SonarConnector.SONAR_DRILLDOWN_VIOLATIONS_SUFFIX + moduleName;
    }

}

export = SonarConnector;