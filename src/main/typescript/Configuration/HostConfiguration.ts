import Config = require('../JsonInterfaces/Config');

class HostConfiguration {

    public hostname: string;
    public protocol: string;
    public username: string;
    public password: string;

    constructor(json: Config.Host) {
        this.hostname = json.hostname;
        this.protocol = json.protocol;
        this.username = json.username;
        this.password = json.password;
    }

}

export = HostConfiguration;