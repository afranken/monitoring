/// <reference path="../jasmine"/>
import Configuration = require('../../../main/ts/configuration/Configuration');
import ConnectorBase = require('../../../main/ts/connector/ConnectorBase');

/**
 * Tests {@link ConnectorBase}
 */
describe("ConnectorBase", function():void {

    var _HOST:string = "myhost";
    var _EXPIRY:number = 888;

    var configuration: Configuration = new Configuration({
        "hosts": [
            {
                "hostname": _HOST,
                "protocol": "https",
                "port": "8080",
                "prefix": "myprefix"
            }
        ],
        "expiry": _EXPIRY
    });

    var testling = new ConnectorBase(configuration);

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling.getExpiry()).toBe(_EXPIRY);
        expect(testling.getUrl(_HOST)).toBe('https://myhost:8080/myprefix');
        expect(()=>testling.getRemoteData(undefined)).toThrow(ConnectorBase.MESSAGE);
    });

});