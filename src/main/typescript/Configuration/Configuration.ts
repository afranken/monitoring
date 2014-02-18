import Config = require('../JsonInterfaces/Config');
import HostConfiguration = require('./HostConfiguration');

class Configuration {

    private static DEFAULT_EXPIRY: number = 36;
    private static DEFAULT_PROTOCOL: string = 'http';
    private static PROTOCOL_SUFFIX: string = '://';

    public expiry: number;
    private hostConfigurations: { [name: string]: HostConfiguration; } = { };

    constructor(private json: Config.Configuration) {
        this.expiry = json.expiry;

        this.init(json);
    }

    private init(json: Config.Configuration) {
        json.hosts.forEach(host => {
            this.hostConfigurations[host.hostname] = new HostConfiguration(host);
        });
    }

    public getExpiry(): number {
        return this.expiry !== undefined ? this.expiry : Configuration.DEFAULT_EXPIRY;
    }

    public getPrefix(hostname:string): string {
        var prefix:string = '';
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            prefix = '/' + hostConfiguration.prefix;
        }

        return prefix;
    }

    public getUsername(hostname: string): string {
        var username: string;
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            username = hostConfiguration.username;
        }

        return username;
    }

    public getPassword(hostname: string): string {
        var password: string;
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            password = hostConfiguration.password;
        }

        return password;
    }

    public getProtocol(hostname: string): string {
        var protocol: string;
        var hostConfiguration: HostConfiguration = this.getHostConfiguration(hostname);
        if(hostConfiguration !== undefined) {
            protocol = hostConfiguration.protocol;
        }
        if(protocol === undefined) {
            protocol = Configuration.DEFAULT_PROTOCOL;
        }

        return protocol+Configuration.PROTOCOL_SUFFIX;
    }

    public getHostConfiguration(hostname: string): HostConfiguration {
        return this.hostConfigurations[hostname];
    }

}

export = Configuration;
