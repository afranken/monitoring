import Connector = require('./Connector');
import Configuration = require('../Configuration/Configuration');
import MonitorModel = require('../MonitorModel');

/**
 * Basic, abstract {@link Connector} aggregating methods used by all {@link Connector} implementations.
 */
class ConnectorBase implements Connector {

    private _configuration: Configuration;

    constructor(configuration: Configuration) {
        this._configuration = configuration;
    }

    /**
     * Get an absolute URL for the given hostname, including configured
     * {@link Config.Configuration.hosts.protocol}, {@link Config.Configuration.hosts.port},
     * and {@link Config.Configuration.hosts.prefix}.
     *
     * @param hostname the hostname to get the URL for
     * @param suffix optional suffix to be added to the URL
     * @returns string the URL
     */
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

    /**
     * @returns number the configured {@link Config.Configuration.expiry}
     */
    public getExpiry():number {
        return this._configuration.getExpiry();
    }

    /**
     * Not implemented, must be overwritten
     */
    public getRemoteData(model:MonitorModel):void {
        throw {
            name: 'Error',
            message: 'UNSUPPORTED, IMPLEMENT THIS METHOD'
        };
    }

}

export = ConnectorBase;