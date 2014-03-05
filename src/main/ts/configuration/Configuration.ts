import Config = require('../jsonInterfaces/Config');

class Configuration {

    private static _DEFAULT_EXPIRY: number = 36;
    private static _DEFAULT_PROTOCOL: string = 'http';
    private static _PROTOCOL_SUFFIX: string = '://';
    private static _PORT_PREFIX: string = ':';
    private static _SLASH: string = '/';

    private static _LIGHT:string = 'light';
    private static _DARK:string = 'dark';
    private static _THEME_LIGHT:string = 'css/vendor/bootstrap-theme.min.css';
    private static _THEME_DARK:string = 'css/bootstrap-theme-monitor-dark.css';

    private _expiry: number;
    private _themeCss: string;
    private _customCss: string;
    private _hostConfigurations: { [name: string]: HostConfiguration; } = { };

    constructor(private json: Config.Configuration) {
        this._expiry = json.expiry;
        this._themeCss = Configuration._THEME_LIGHT;
        this.init(json);
    }

    private init(json: Config.Configuration) {
        json.hosts.forEach(host => {
            this._hostConfigurations[host.hostname] = new HostConfiguration(host);
        });
        if(json.theme !== undefined) {
            if(json.theme.css !== undefined) {
                this._customCss = json.theme.css;
            }
            if(Configuration._DARK.match(json.theme.style)) {
                this._themeCss = Configuration._THEME_DARK;
            }
        }
    }

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

    public getThemeCss():string {
        return this._themeCss;
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
            if(hostConfiguration.prefix !== undefined) {
                prefix = Configuration._SLASH + hostConfiguration.prefix;
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
            if(hostConfiguration.port !== undefined) {
                port = Configuration._PORT_PREFIX + hostConfiguration.port;
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
            username = hostConfiguration.username;
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
            password = hostConfiguration.password;
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
