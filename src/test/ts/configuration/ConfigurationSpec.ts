/// <reference path="../jasmine"/>
import Configuration = require('../../../main/ts/configuration/Configuration');

/**
 * Tests {@link Configuration}
 */
describe("Configuration", function():void {

    var _HOST_DOES_NOT_EXIST:string = "UNDEFINED";
    var _HOST_WITH_PROTOCOL:string = "hostWithProtocol";
    var _HOST_WITH_PORT_AND_PREFIX:string = "hostWithPort";
    var _HOST_WITH_USERNAME_AND_PASSWORD:string = "hostWithUsernameAndPassword";

    var testling: Configuration = new Configuration({
        "hosts": [
            {
                "hostname": _HOST_WITH_PROTOCOL,
                "protocol": "https"
            },
            {
                "hostname": _HOST_WITH_PORT_AND_PREFIX,
                "port": "8080",
                "prefix": "sonar"
            },
            {
                "hostname": _HOST_WITH_USERNAME_AND_PASSWORD,
                "username": "myusername",
                "password": "mypassword"
            }
        ],
        "expiry": 888
    });

    /**
     * Test default values
     */
    it("BaseCases", function():void {
        expect(testling.getExpiry()).toBe(888);
        expect(testling.getProtocol(_HOST_DOES_NOT_EXIST)).toBe('http://');
        expect(testling.getPort(_HOST_DOES_NOT_EXIST)).toBe('');
        expect(testling.getPrefix(_HOST_DOES_NOT_EXIST)).toBe('');
        expect(testling.getPassword(_HOST_DOES_NOT_EXIST)).toBe(undefined);
        expect(testling.getUsername(_HOST_DOES_NOT_EXIST)).toBe(undefined);
    });

    /**
     * Test protocol override
     */
    it("ProtocolOnly", function():void {
        expect(testling.getProtocol(_HOST_WITH_PROTOCOL)).toBe("https://");
    });

    /**
     * Test Port and prefix override
     */
    it("PortAndPrefix", function():void {
        expect(testling.getPort(_HOST_WITH_PORT_AND_PREFIX)).toBe(':8080');
        expect(testling.getPrefix(_HOST_WITH_PORT_AND_PREFIX)).toBe('/sonar');
    });

    /**
     * Test Username and Password override
     */
    it("PortAndPrefix", function():void {
        expect(testling.getUsername(_HOST_WITH_USERNAME_AND_PASSWORD)).toBe('myusername');
        expect(testling.getPassword(_HOST_WITH_USERNAME_AND_PASSWORD)).toBe('mypassword');
    });

});