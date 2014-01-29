import Json = require("JsonInterfaces");
import HostConfiguration = require("HostConfiguration");

class Configuration {

    private hosts: HostConfiguration[];
    private expiry: number;

    constructor(private json: Json.Settings) {
        json.hosts.forEach(host => {
            this.hosts.push(new HostConfiguration(host));
        });
        this.expiry = json.expiry;
    }

    private getHost(name: String): HostConfiguration {
        return this.hosts[0];
    }

}

export = Configuration;
