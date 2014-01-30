import JsonInterfaces = require("JsonInterfaces");
import Connector = require("Connector");
import Configuration = require("Configuration");

class JenkinsConnector implements Connector {

    private configuration: JsonInterfaces.Settings;

    //suffix that ensures that Jenkins returns JSONP
    private JSONP_SUFFIX = "/api/json?jsonp=?";

    //suffix that tells Jenkins to only include certain properties in response
    private JOB_STATUS_SUFFIX = "&tree=lastBuild[timestamp],name,color&depth=1";

    //suffix that tells Jenkins to only include certain properties of modules in response
    private MODULES_STATUS_SUFFIX = "&tree=modules[name,url,displayName,color,lastBuild[timestamp]]&depth=1";

    getJson(host:string, url:string): string {

        return 'blue';
    }

}

export = JenkinsConnector;