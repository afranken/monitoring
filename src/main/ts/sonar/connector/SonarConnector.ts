///ts:ref=jquery.d.ts
/// <reference path="../../vendor/jquery.d.ts"/> ///ts:ref:generated
///ts:ref=SonarResponse.d.ts
/// <reference path="../../jsonInterfaces/SonarResponse.d.ts"/> ///ts:ref:generated
import jQuery = require('jquery');
import SonarResponse = require('SonarJsonResponse');
///ts:import=Connector
import Connector = require('../../connector/Connector'); ///ts:import:generated
///ts:import=ConnectorBase
import ConnectorBase = require('../../connector/ConnectorBase'); ///ts:import:generated
///ts:import=SonarMonitorModel
import SonarMonitorModel = require('../model/SonarMonitorModel'); ///ts:import:generated

/**
 * Get data from Sonar {@link http://www.sonarqube.org/}
 */
class SonarConnector extends ConnectorBase implements Connector {

    private static SONAR_DRILLDOWN_VIOLATIONS_SUFFIX:string = '/drilldown/violations/';
    private static SONAR_RESOURCE_VIOLATIONS_API_SUFFIX:string = '/api/resources?callback=?&format=json&metrics=blocker_violations,critical_violations,major_violations,minor_violations,info_violations&resource=';

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    public getRemoteData(model:SonarMonitorModel):void {
        model.getExternalRef().forEach(externalRef => {
            jQuery.getJSON(this.getApiUrl(model,externalRef.id),
                (violations: Array<SonarResponse.Json>) => {
                    this.updateModel(violations, model, externalRef.id);
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    if(console) {
                        console.log(jqXHR, textStatus, errorThrown, this.getApiUrl(model,externalRef.id));
                    }
                });
        });

        //reload data periodically.
        setTimeout(() => this.getRemoteData(model), ConnectorBase.getRandomTimeout());
    }

    public updateModel(json: Array<SonarResponse.Json>, model:SonarMonitorModel, moduleName:string):void {
        model.addUrl(moduleName, this.getModuleUrl(model,moduleName));
        model.addViolations(moduleName,json);
    }

    public getApiUrl(model:SonarMonitorModel, moduleName:string):string {
        return this.getUrl(model.getHostname()) + SonarConnector.SONAR_RESOURCE_VIOLATIONS_API_SUFFIX + moduleName;
    }

    public getModuleUrl(model:SonarMonitorModel, moduleName:string):string {
        return this.getUrl(model.getHostname()) + SonarConnector.SONAR_DRILLDOWN_VIOLATIONS_SUFFIX + moduleName;
    }

}

export = SonarConnector;