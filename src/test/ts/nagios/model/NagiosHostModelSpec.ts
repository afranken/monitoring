///ts:ref=NagiosResponse.d.ts
/// <reference path="../../../../main/ts/jsonInterfaces/NagiosResponse.d.ts"/> ///ts:ref:generated
///ts:ref=jasmine.d.ts
/// <reference path="../../jasmine.d.ts"/> ///ts:ref:generated
///ts:import=CssClasses
import CssClasses = require('../../../../main/ts/util/CssClasses'); ///ts:import:generated
///ts:import=NagiosHostModel
import NagiosHostModel = require('../../../../main/ts/nagios/model/NagiosHostModel'); ///ts:import:generated

import NagiosJsonResponse = require('NagiosJsonResponse');

/**
 * Tests {@link NagiosHostModel}
 */
describe('NagiosHostModel', function(): void {

    var serviceOK: NagiosJsonResponse.NagiosService = {
        service_status: NagiosHostModel.STATUS_OK,
        service_host: {
            host_name: 'test1'
        },
        service_description: 'test1',
        service_plugin_output: 'test1'
    };

    var serviceWARNING: NagiosJsonResponse.NagiosService = {
        service_status: NagiosHostModel.STATUS_WARNING,
        service_host: {
            host_name: 'test2'
        },
        service_description: 'test2',
        service_plugin_output: 'test2'
    };

    var serviceCRITICAL: NagiosJsonResponse.NagiosService = {
        service_status: NagiosHostModel.STATUS_CRITICAL,
        service_host: {
            host_name: 'test3'
        },
        service_description: 'test3',
        service_plugin_output: 'test3'
    };


    var testling: NagiosHostModel = new NagiosHostModel('name', 'hostname', 'url');

    it('TestBase', function(): void {
        expect(testling.getName()).toEqual('name');
        expect(testling.getHostname()).toEqual('hostname');
        expect(testling.getUrl()).toEqual('url');
    });

    it('TestAddService0', function(): void {
        expect(testling.getAllServices().length).toBeFalsy();
        expect(testling.getBrokenServices().length).toBeFalsy();
        expect(testling.getCss()).toEqual(CssClasses.BASIC_CLASSES);
    });

    it('TestAddService1', function(): void {
        testling.addService(serviceOK);
        expect(testling.getAllServices()).toEqual(['test1']);
        expect(testling.getBrokenServices().length).toBeFalsy();
        expect(testling.getCss()).toEqual(CssClasses.SUCCESS + CssClasses.BASIC_CLASSES);
    });

    it('TestAddService2', function(): void {
        testling.addService(serviceWARNING);
        expect(testling.getAllServices()).toEqual(['test1', 'test2']);
        expect(testling.getBrokenServices()).toEqual(['test2']);
        expect(testling.getCss()).toEqual(CssClasses.WARNING + CssClasses.BASIC_CLASSES);
    });

    it('TestAddService3', function(): void {
        testling.addService(serviceCRITICAL);
        expect(testling.getAllServices()).toEqual(['test1', 'test2', 'test3']);
        expect(testling.getBrokenServices()).toEqual(['test2', 'test3']);
        expect(testling.getCss()).toEqual(CssClasses.FAILURE + CssClasses.BASIC_CLASSES);
    });

    it('TestAddService1Again', function(): void {
        testling.addService(serviceOK);
        expect(testling.getAllServices()).toEqual(['test1', 'test2', 'test3']);
        expect(testling.getBrokenServices()).toEqual(['test2', 'test3']);
        expect(testling.getCss()).toEqual(CssClasses.FAILURE + CssClasses.BASIC_CLASSES);
    });

});
