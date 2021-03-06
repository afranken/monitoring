///ts:import=Types
import Types = require('../../util/Types'); ///ts:import:generated
///ts:import=MonitorViewModel
import MonitorViewModel = require('../../model/MonitorViewModel'); ///ts:import:generated
///ts:import=NagiosMonitorModel
import NagiosMonitorModel = require('../model/NagiosMonitorModel'); ///ts:import:generated
///ts:import=NagiosViewModelTuple
import NagiosViewModelTuple = require('./NagiosViewModelTuple'); ///ts:import:generated
///ts:import=NagiosBoxViewModel
import NagiosBoxViewModel = require('./NagiosBoxViewModel'); ///ts:import:generated
///ts:import=NagiosDetailsViewModel
import NagiosDetailsViewModel = require('./NagiosDetailsViewModel'); ///ts:import:generated

/**
 * ViewModel that represents a list of Nagios hosts.
 */
class NagiosMonitorViewModel implements MonitorViewModel {

    private _model: NagiosMonitorModel;
    private _models: Array<NagiosViewModelTuple> = [];

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(model: NagiosMonitorModel) {
        this._model = model;

        this.init();
    }

    private init() {
        this._model.getHostnames().forEach((name: string) => {
            var boxModel = new NagiosBoxViewModel(this._model.getHostModel(name));
            var detailsModel = new NagiosDetailsViewModel(this._model.getHostModel(name));
            this._models.push(new NagiosViewModelTuple(boxModel, detailsModel));
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getName(): string {
        return this._model.getName();
    }

    public getModels(): Array<NagiosViewModelTuple> {
        return this._models;
    }

    public getType(): string {
        return Types.NAGIOS;
    }

}

export = NagiosMonitorViewModel;
