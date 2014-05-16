/// <reference path='../../jasmine.d'/>
import Configuration = require('../../../../main/ts/configuration/Configuration');
import MonitorModels = require('../../../../main/ts/model/MonitorModels');
import SonarMonitorModel = require('../../../../main/ts/sonar/model/SonarMonitorModel');
import SonarConnector = require('../../../../main/ts/sonar/connector/SonarConnector');
import SonarJsonResponse = require('../../../../main/ts/jsonInterfaces/SonarResponse');
import Config = require('../../../../main/ts/jsonInterfaces/Config');
import Types = require('../../../../main/ts/util/Types');

/**
 * Tests {@link SonarConnector}
 */
describe('SonarConnector', function():void {

    var _HOST: string = 'myhost';
    var _NAME: string = 'mymonitor';
    var _EXPIRY: number = 888;

    var configuration: Configuration = new Configuration({
        hosts: [
            {
                hostname: _HOST,
                protocol: 'https',
                port: '8080',
                prefix: 'myprefix'
            }
        ],
        expiry: _EXPIRY
    });


    var monitorJson: Config.ExtendedMonitor = {
        name: _NAME,
        externalRef: [
            {
                name: 'myname',
                id: 'myid'
            },
            {
                name: 'myname2',
                id: 'myid2'
            }
        ],
        hostname: _HOST,
        type: Types.SONAR
    };

    var monitor: SonarMonitorModel = <SonarMonitorModel>MonitorModels.createModel(monitorJson, configuration, _HOST);

    var testling: SonarConnector = new SonarConnector(configuration);

    /**
     * Test all methods
     */
    it('TestMethods', function(): void {
        expect(testling.getExpiry()).toBe(_EXPIRY);
        expect(testling.getApiUrl(monitor,'mymodule'))
            .toBe('https://myhost:8080/myprefix/api/resources?callback=?&format=json&metrics=blocker_violations,critical_violations,major_violations,minor_violations,info_violations&resource=mymodule');
        expect(testling.getModuleUrl(monitor,'mymodule')).toBe('https://myhost:8080/myprefix/drilldown/violations/mymodule');
    });

});
