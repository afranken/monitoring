///ts:ref=jasmine.d.ts
/// <reference path="./jasmine.d.ts"/> ///ts:ref:generated
///ts:ref=moment.d.ts
/// <reference path="../../main/ts/vendor/moment.d.ts"/> ///ts:ref:generated
///ts:import=ExpirationCalculator
import ExpirationCalculator = require('../../main/ts/util/ExpirationCalculator'); ///ts:import:generated

import moment = require('moment');

/**
 * Tests {@link ExpirationCalculator}
 */
describe('ExpirationCalculator', function(): void {

    var DATE: Date = new Date();
    var NOW: number = DATE.getTime();
    var ONE_HOUR_EARLIER: number = moment(DATE).subtract('hours', 1).valueOf();
    var THREE_HOURS_EARLIER: number = moment(DATE).subtract('hours', 3).valueOf();
    var FIVE_HOURS_EARLIER: number = moment(DATE).subtract('hours', 5).valueOf();
    var FIVE_HOURS_EXPIRY: number = 5;

    /**
     * Test all methods
     */
    it('TestMethods', function(): void {
        expect(ExpirationCalculator.calculateExpiration(NOW, FIVE_HOURS_EXPIRY)).toMatch('0.99\\d+');
        expect(ExpirationCalculator.calculateExpiration(ONE_HOUR_EARLIER, FIVE_HOURS_EXPIRY)).toMatch('0.89\\d+');
        expect(ExpirationCalculator.calculateExpiration(THREE_HOURS_EARLIER, FIVE_HOURS_EXPIRY)).toMatch('0.69\\d+');
        expect(ExpirationCalculator.calculateExpiration(FIVE_HOURS_EARLIER, FIVE_HOURS_EXPIRY)).toBe(0.25);
    });

});
