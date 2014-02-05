/// <reference path="vendor/knockout.d.ts" />
import JobModel = require("./JobModel");

interface Connector {

    getJson(id:string, hostname:string, model: JobModel): void;

}

export = Connector;