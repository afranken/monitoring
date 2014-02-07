import Config = require('../JsonInterfaces/Config');
import MonitorModel = require('../MonitorModel');
import Connector = require('../Connector');
import NagiosConnector = require('./NagiosConnector');

class NagiosMonitorModel implements MonitorModel {

    public static TYPE: string = 'nagios';
    public type:string = NagiosMonitorModel.TYPE;

    updateStatus():void {

        //JSON call.
    }

}

export = NagiosMonitorModel;