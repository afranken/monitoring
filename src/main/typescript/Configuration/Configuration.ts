import JsonInterfaces = require('../JsonInterfaces.d');
import HostConfiguration = require('./HostConfiguration');

class Configuration {

    private hosts: HostConfiguration[];
    private expiry: number;

    constructor(private json: JsonInterfaces.Settings) {
        this.expiry = json.expiry;

        this.init(json);
    }

    private init(json: JsonInterfaces.Settings) {
        json.hosts.forEach(host => {
            this.hosts.push(new HostConfiguration(host));
        });
    }

    public getHost(name: String): HostConfiguration {
        return this.hosts[0];
    }

}

export = Configuration;
