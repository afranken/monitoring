import Config = require('jsonInterfaces/Config');

class Configuration {

    private static _DEFAULT_EXPIRY: number = 36;
    private static _DEFAULT_PROTOCOL: string = 'http';
    private static _PROTOCOL_SUFFIX: string = '://';
    private static _PORT_PREFIX: string = ':';
    private static _SLASH: string = '/';

    private _expiry: number;
    private _customCss: string;
    private _hostConfigurations: { [name: string]: HostConfiguration; } = { };

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(private json: Config.Configuration) {
        this._expiry = json.expiry;
        if(json.hosts !== undefined) {
            json.hosts.forEach(host => {
                this._hostConfigurations[host.hostname] = new HostConfiguration(host);
            });
        }
        if(json.theme !== undefined && json.theme.customCss !== undefined) {
            this._customCss = json.theme.customCss;
        }
    }

    //==================================================================================================================
    // Functionality
    //==================================================================================================================

    /**
     * Get the expiry.
     * Default: {@link _DEFAULT_EXPIRY}
     * @returns number {@link _DEFAULT_EXPIRY} or {@link Configuration.expiry}
     */
    public getExpiry(): number {
        return this._expiry !== undefined ? this._expiry : Configuration._DEFAULT_EXPIRY;
    }

    public getCustomCss():string {
        return this._customCss;
    }

    /**
     * Get prefix for given hostname.
     * Default: empty string ''
     *
     * @param hostname
     * @returns string {@link _SLASH} and the prefix (e.g. '/sonar'), or ''
     */
    public getPrefix(hostname:string): string {
        var prefix:string = '';
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            if(hostConfiguration.getPrefix() !== undefined) {
                prefix = Configuration._SLASH + hostConfiguration.getPrefix();
            }
        }

        return prefix;
    }

    /**
     * Get port for given hostname.
     * Default: empty string ''
     *
     * @param hostname
     * @returns string {@link _PORT_PREFIX} and the port (e.g. :8080), or ''
     */
    public getPort(hostname:string): string {
        var port:string = '';
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            if(hostConfiguration.getPort() !== undefined) {
                port = Configuration._PORT_PREFIX + hostConfiguration.getPort();
            }
        }

        return port;
    }

    /**
     * Get username for given hostname.
     * Default: {@link undefined}
     *
     * @param hostname
     * @returns string the username, or undefined
     */
    public getUsername(hostname: string): string {
        var username: string = undefined;
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            username = hostConfiguration.getUsername();
        }

        return username;
    }

    /**
     * Get configured password for given hostname.
     * Default: {@link undefined}
     *
     * @param hostname
     * @returns string the password, or undefined
     */
    public getPassword(hostname: string): string {
        var password: string = undefined;
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            password = hostConfiguration.getPassword();
        }

        return password;
    }

    /**
     * Get {@link Config.Configuration} protocol for given hostname.
     * Default: "http://"
     *
     * @param hostname
     * @returns string the protocol including the suffix {@link _PROTOCOL_SUFFIX}
     */
    public getProtocol(hostname: string): string {
        var protocol: string = undefined;
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            protocol = hostConfiguration.getProtocol();
        }
        if(protocol === undefined) {
            protocol = Configuration._DEFAULT_PROTOCOL;
        }

        return protocol+Configuration._PROTOCOL_SUFFIX;
    }

    //==================================================================================================================
    // Private
    //==================================================================================================================

    private getHostConfiguration(hostname: string): HostConfiguration {
        return this._hostConfigurations[hostname];
    }

}

/**
 * Private class, only used for storing data
 */
class HostConfiguration {

    private _hostname: string;
    private _protocol: string;
    private _port: string;
    private _prefix: string;
    private _username: string;
    private _password: string;

    constructor(json: Config.Host) {
        this._hostname = json.hostname;
        this._protocol = json.protocol;
        this._port = json.port;
        this._prefix = json.prefix;
        this._username = json.username;
        this._password = json.password;
    }

    public getPassword():string {
        return this._password;
    }
    public getUsername():string {
        return this._username;
    }
    public getPrefix():string {
        return this._prefix;
    }
    public getPort():string {
        return this._port;
    }
    public getProtocol():string {
        return this._protocol;
    }
    public getHostname():string {
        return this._hostname;
    }

}

export = Configuration;
