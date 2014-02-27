import Config = require('../JsonInterfaces/Config');

class Configuration {

    private static _DEFAULT_EXPIRY: number = 36;
    private static _DEFAULT_PROTOCOL: string = 'http';
    private static _PROTOCOL_SUFFIX: string = '://';

    private _expiry: number;
    private _hostConfigurations: { [name: string]: HostConfiguration; } = { };

    constructor(private json: Config.Configuration) {
        this._expiry = json.expiry;

        this.init(json);
    }

    private init(json: Config.Configuration) {
        json.hosts.forEach(host => {
            this._hostConfigurations[host.hostname] = new HostConfiguration(host);
        });
    }

    public getExpiry(): number {
        return this._expiry !== undefined ? this._expiry : Configuration._DEFAULT_EXPIRY;
    }

    public getPrefix(hostname:string): string {
        var prefix:string = '';
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            if(hostConfiguration.prefix !== undefined) {
                prefix = '/' + hostConfiguration.prefix;
            }
        }

        return prefix;
    }

    public getPort(hostname:string): string {
        var port:string = '';
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            if(hostConfiguration.port !== undefined) {
                port = ':' + hostConfiguration.port;
            }
        }

        return port;
    }

    public getUsername(hostname: string): string {
        var username: string = undefined;
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            username = hostConfiguration.username;
        }

        return username;
    }

    public getPassword(hostname: string): string {
        var password: string = undefined;
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            password = hostConfiguration.password;
        }

        return password;
    }

    /**
     * Get protocol for given hostname.
     * Default: http
     *
     * @param hostname
     * @returns string the protocol including the suffix {@link _PROTOCOL_SUFFIX}
     */
    public getProtocol(hostname: string): string {
        var protocol: string = undefined;
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            protocol = hostConfiguration.protocol;
        }
        if(protocol === undefined) {
            protocol = Configuration._DEFAULT_PROTOCOL;
        }

        return protocol+Configuration._PROTOCOL_SUFFIX;
    }

    private getHostConfiguration(hostname: string): HostConfiguration {
        return this._hostConfigurations[hostname];
    }

}

/**
 * Private class, only used for storing data
 */
class HostConfiguration {

    public hostname: string;
    public protocol: string;
    public port: string;
    public prefix: string;
    public username: string;
    public password: string;

    constructor(json: Config.Host) {
        this.hostname = json.hostname;
        this.protocol = json.protocol;
        this.port = json.port;
        this.prefix = json.prefix;
        this.username = json.username;
        this.password = json.password;
    }

}

export = Configuration;
