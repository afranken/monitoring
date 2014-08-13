///ts:ref=Config.d.ts
/// <reference path="../../jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:import=MonitorModel
import MonitorModel = require('../../model/MonitorModel'); ///ts:import:generated

import Config = require('Config');

class NavigatorMonitorModel implements MonitorModel {


    private _name: string;
    private _links: Config.Link[];

    constructor(job: Config.Navigator) {
        this._links = job.externalRef;
        this._name = job.name;
    }

    public getName(): string {
        return this._name;
    }

    public getLinks(): Config.Link[] {
        return this._links;
    }

    setData(data): void {
        //this method is not implemented.
    }

    updateStatus(): void {
        //this method is not implemented.
    }

}

export = NavigatorMonitorModel;
