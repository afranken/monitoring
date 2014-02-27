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
        url = this._configuration.getProtocol(hostname);
        url = url+hostname;
        url = url+this._configuration.getPort(hostname);
        url = url+this._configuration.getPrefix(hostname);
        if(suffix) {
            url = url+suffix;
        }

        return url;
    }

    public getExpiry():number {
        return this._configuration.getExpiry();
    }

    public getRemoteData(model:MonitorModel):void {
        throw {
            name: 'Error',
            message: 'UNSUPPORTED, IMPLEMENT THIS METHOD'
        };
    }

}

export = ConnectorBase;