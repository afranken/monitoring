import Types = require('../../../main/ts/util/Types');
import Config = require('../../../main/ts/jsonInterfaces/Config');
import Connectors = require('../../../main/ts/connector/Connectors');
import Configuration = require('../../../main/ts/configuration/Configuration');
import MonitorModels = require('../../../main/ts/monitorModel/MonitorModels');
import NagiosMonitorModel = require('../../../main/ts/nagios/model/NagiosMonitorModel');
import NagiosConnector = require('../../../main/ts/nagios/connector/NagiosConnector');

class NagiosSpecDataProvider {

    public static HOST:string = "myhost";
    public static NAME:string = "mymonitor";
    public static ID:string = "myid,myid2";
    public static EXPIRY:number = 888;

    public configuration:Configuration = new Configuration({
        "hosts": [
            {
                "hostname": NagiosSpecDataProvider.HOST,
                "protocol": "https",
                "port": "8080",
                "prefix": "myprefix"
            }
        ],
        "expiry": NagiosSpecDataProvider.EXPIRY
    });


    public static MONITOR_JSON:Config.Monitor = {
        "name": NagiosSpecDataProvider.NAME,
        "externalRef": [
            {
                "name": "myname",
                "externalId": "myid"
            },
            {
                "name": "myname2",
                "externalId": "myid2"
            }
        ],
        "hostname": NagiosSpecDataProvider.HOST,
        "type": Types.NAGIOS
    };

    public getNagiosMonitorModel():NagiosMonitorModel {
        return <NagiosMonitorModel>MonitorModels.createModel(NagiosSpecDataProvider.MONITOR_JSON, this.configuration, NagiosSpecDataProvider.HOST);
    }

    public getNagiosConnector():NagiosConnector {
        return <NagiosConnector>Connectors.createConnector(this.configuration, Types.NAGIOS);
    }

}

export = NagiosSpecDataProvider;