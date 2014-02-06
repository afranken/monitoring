import Connector = require('../Connector')
import MonitorModel = require('../MonitorModel');

class NagiosConnector implements Connector {


    getJson(id:string, hostname:string, model:MonitorModel):void {


    }

}

export = NagiosConnector;