/// <reference path="vendor/knockout.d.ts" />

interface Connector {

    getJson(name:string, hostname:string, status:KnockoutObservable<string>, style:KnockoutObservable<string>): void;

}

export = Connector;