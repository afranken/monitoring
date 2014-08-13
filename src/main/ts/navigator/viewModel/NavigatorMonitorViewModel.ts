///ts:import=Types
import Types = require('../../util/Types'); ///ts:import:generated
///ts:import=MonitorViewModel
import MonitorViewModel = require('../../model/MonitorViewModel'); ///ts:import:generated
///ts:import=NavigatorMonitorModel
import NavigatorMonitorModel = require('../model/NavigatorMonitorModel'); ///ts:import:generated
///ts:import=Link
import Link = require('./Link'); ///ts:import:generated

class NavigatorMonitorViewModel implements MonitorViewModel {

    private _model: NavigatorMonitorModel;

    constructor(model: NavigatorMonitorModel) {
        this._model = model;
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getName(): string {
        return this._model.getName();
    }

    public getLinks(): Array<Link> {
        var links: Array<Link> = [];
        this._model.getLinks().forEach(link => {
            links.push(new Link(link));
        } );
        return links;
    }

    getType(): string {
        return Types.NAVIGATOR;
    }


}

export = NavigatorMonitorViewModel;
