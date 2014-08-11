///ts:import=Connector
import Connector = require('./Connector'); ///ts:import:generated
///ts:import=Configuration
import Configuration = require('../configuration/Configuration'); ///ts:import:generated
///ts:import=MonitorModel
import MonitorModel = require('../model/MonitorModel'); ///ts:import:generated

/**
 * Basic, abstract {@link Connector} aggregating methods used by all {@link Connector} implementations.
 */
class ConnectorBase implements Connector {

    public static MESSAGE: string = 'UNSUPPORTED, IMPLEMENT THIS METHOD';

    private static _TIMEOUT_BASE = 60;

    private _configuration: Configuration;

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(configuration: Configuration) {
        this._configuration = configuration;
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    /**
     * Get an absolute URL for the given hostname, including configured
     * {@link Config.Host.protocol}, {@link Config.Host.port},
     * and {@link Config.Host.prefix}.
     *
     * @param hostname the hostname to get the URL for
     * @param suffix optional suffix to be added to the URL
     * @param hostPrefix optional prefix to be added to the hostname
     * @returns string the URL
     */
    public getUrl(hostname: string, suffix?: string, hostPrefix?: string): string {
        var url: string = '';
        url = this._configuration.getProtocol(hostname);
        if (hostPrefix) {
            url = url + hostPrefix;
        }
        url = url + hostname;
        url = url + this._configuration.getPort(hostname);
        url = url + this._configuration.getPrefix(hostname);
        if (suffix) {
            url = url + suffix;
        }

        return url;
    }

    /**
     * @returns number the configured {@link Config.Configuration.expiry}
     */
    public getExpiry(): number {
        return this._configuration.getExpiry();
    }

    /**
     * Not implemented, must be overwritten
     */
    public getRemoteData(model: MonitorModel): void {
        throw {
            name: 'Error',
            message: ConnectorBase.MESSAGE
        };
    }

    /**
     * @returns number between 60 and 120 seconds, in milliseconds.
     */
    public static getRandomTimeout(): number {
        return (ConnectorBase._TIMEOUT_BASE + (Math.random() * 60)) * 1000;
    }

}

export = ConnectorBase;
