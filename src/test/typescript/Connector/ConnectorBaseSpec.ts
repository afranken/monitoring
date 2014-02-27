/// <reference path="../jasmine"/>
import Configuration = require('../../../main/typescript/Configuration/Configuration');
import ConnectorBase = require('../../../main/typescript/Connector/ConnectorBase');

/**
 * Tests {@link Configuration}
 */
describe("ConnectorBase", function():void {

    var _HOST:string = "myhost";

    var configuration: Configuration = new Configuration({
        "hosts": [
            {
                "hostname": _HOST,
                "protocol": "https",
                "port": "8080",
                "prefix": "myprefix"
            }
        ],
        "expiry": 888
    });

    var testling = new ConnectorBase(configuration);

    /**
     * Test all methods
     */
    it("TestMethods", function():void {
        expect(testling.getExpiry()).toBe(888);
        expect(testling.getUrl(_HOST)).toBe('https://myhost:8080/myprefix');
        expect(()=>testling.getRemoteData(undefined)).toThrow('UNSUPPORTED, IMPLEMENT THIS METHOD');
    });

});