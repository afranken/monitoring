import Connector = require('../Connector')
import MonitorModel = require('../MonitorModel');
import Configuration = require('../Configuration/Configuration');

class NagiosConnector implements Connector {

    constructor(configuration: Configuration) {

    }

    getJson(id:string, hostname:string, model:MonitorModel):void {


    }

}

export = NagiosConnector;