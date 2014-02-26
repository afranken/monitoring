import Connector = require('./Connector');
import Configuration = require('../Configuration/Configuration');
import MonitorModel = require('../MonitorModel');

class ConnectorBase implements Connector {

    private _configuration: Configuration;

    constructor(configuration: Configuration) {
        this._configuration = configuration;
    }

    public getUrl(hostname:string, suffix?:string):string {
        var url:string = '';
        url = this.getConfiguration().getProtocol(hostname);
        url = url+hostname;
        url = url+this.getConfiguration().getPort(hostname);
        url = url+this.getConfiguration().getPrefix(hostname);
        if(suffix) {
            url = url+suffix;
        }

        return url;
    }

    public getConfiguration():Configuration {
        return this._configuration;
    }

    public getRemoteData(model:MonitorModel):void {
        throw "UNSUPPORTED, IMPLEMENT THIS METHOD";
    }

}

export = ConnectorBase;