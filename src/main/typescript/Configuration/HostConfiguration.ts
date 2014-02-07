import JsonInterfaces = require('../JsonInterfaces.d');

class HostConfiguration {

    public hostname: string;
    public protocol: string;
    public username: string;
    public password: string;

    constructor(json: JsonInterfaces.Host) {
        this.hostname = json.hostname;
        this.protocol = json.protocol;
        this.username = json.username;
        this.password = json.password;
    }

}

export = HostConfiguration;