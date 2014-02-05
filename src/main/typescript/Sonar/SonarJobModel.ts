/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../vendor/knockout.d.ts" />
import JobModel = require("JobModel")
import Connector = require("Connector")
import JenkinsConnector = require("../Jenkins/JenkinsConnector")
import JsonInterfaces = require("JsonInterfaces");
import SonarModuleModel = require("SonarModuleModel");
import ko = require("knockout");

/**
 * TODO: clean up
 */
class SonarJobModel {

    public static TYPE = 'sonar';

    public name:string;
    public type:string;
    public url:string;
    public hostname:string;
    public status:KnockoutObservable<string> = ko.observable<string>();
    public style:KnockoutObservable<string> = ko.observable<string>();
    public violations: SonarModuleModel[] = [];

    constructor(private sonar:JsonInterfaces.Sonar, public connector:Connector, hostname:string) {
        this.name = sonar.name;
        this.hostname = sonar.hostname !== undefined ? sonar.hostname : hostname;
        this.status(JenkinsConnector.BASIC_CLASSES);
        this.style(JenkinsConnector.BASIC_STYLE);
        this.type = SonarJobModel.TYPE;
        this.url = "http://" + this.hostname + "/sonar/";

        this.init(sonar);
    }

    private init(sonar:JsonInterfaces.Sonar){
        sonar.modules.forEach(module => {
            this.violations.push(new SonarModuleModel(module.name, module.id, this.hostname,this.connector));
        });
    }

}

export = SonarJobModel;
