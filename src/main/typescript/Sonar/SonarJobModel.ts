/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../vendor/knockout.d.ts" />
import JobModel = require('../MonitorModel')
import Connector = require('../Connector')
import JenkinsConnector = require('../Jenkins/JenkinsConnector')
import Config = require('../JsonInterfaces/Config');
import SonarMonitorModel = require('./SonarMonitorModel');
import ko = require('knockout');

/**
 * TODO: clean up
 */
class SonarJobModel {

    public static TYPE: string = 'sonar';

    public name:string;
    public type:string;
    public url:string;
    public hostname:string;
    public violations: SonarMonitorModel[] = [];

    constructor(private sonar:Config.Sonar, public connector:Connector, hostname:string) {
        this.name = sonar.name;
        this.hostname = sonar.hostname !== undefined ? sonar.hostname : hostname;
        this.type = SonarJobModel.TYPE;
        this.url = 'http://' + this.hostname + '/sonar/';

        this.init(sonar);
    }

    private init(sonar:Config.Sonar){
        sonar.modules.forEach(module => {
            this.violations.push(new SonarMonitorModel(module.name, module.id, this.hostname,this.connector));
        });
    }

}

export = SonarJobModel;
