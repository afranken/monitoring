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
        ]
    });

    var testling = new ConnectorBase(configuration);

    /**
     * Test default values
     */
    it("BaseCase", function():void {
        expect(testling.getUrl(_HOST)).toBe('https://myhost:8080/myprefix');
    });

});