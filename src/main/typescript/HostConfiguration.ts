import JsonInterfaces = require("JsonInterfaces");

class HostConfiguration {

    private hostname: string;
    private username: string;
    private password: string;

    constructor(json: JsonInterfaces.Host) {
        this.hostname = json.hostname;
        this.username = json.username;
        this.password = json.password;
    }



}

export = HostConfiguration;