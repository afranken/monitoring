///ts:import=Types
import Types = require('../../util/Types'); ///ts:import:generated
///ts:import=MonitorViewModel
import MonitorViewModel = require('../../model/MonitorViewModel'); ///ts:import:generated
///ts:import=TravisMonitorModel
import TravisMonitorModel = require('../model/TravisMonitorModel'); ///ts:import:generated
///ts:import=TravisDetailsViewModel
import TravisDetailsViewModel = require('./TravisDetailsViewModel'); ///ts:import:generated
///ts:import=TravisBoxViewModel
import TravisBoxViewModel = require('./TravisBoxViewModel'); ///ts:import:generated

/**
 * Main ViewModel that is used to display Travis data.
 */
class TravisMonitorViewModel implements MonitorViewModel {

    private _details: TravisDetailsViewModel;
    private _box: TravisBoxViewModel;
    private _model: TravisMonitorModel;

    constructor(model: TravisMonitorModel) {
        this._model = model;
        this._box = new TravisBoxViewModel(this._model);
        this._details = new TravisDetailsViewModel(this._model);
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getBox(): TravisBoxViewModel {
        return this._box;
    }

    public getDetails(): TravisDetailsViewModel {
        return this._details;
    }

    public getType(): string {
        return Types.TRAVIS;
    }

    public getHtmlsafeId(): string {
        return this._model.getHtmlsafeId();
    }

}

export = TravisMonitorViewModel;
