/// <reference path="vendor/knockout.d.ts" />
import MonitorModel = require('./MonitorModel');

interface Connector {

    getJson(id:string, hostname:string, model: MonitorModel): void;

}

export = Connector;