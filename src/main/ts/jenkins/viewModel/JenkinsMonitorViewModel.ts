///ts:import=Types
import Types = require('../../util/Types'); ///ts:import:generated
///ts:import=MonitorViewModel
import MonitorViewModel = require('../../model/MonitorViewModel'); ///ts:import:generated
///ts:import=JenkinsMonitorModel
import JenkinsMonitorModel = require('../model/JenkinsMonitorModel'); ///ts:import:generated
///ts:import=JenkinsDetailsViewModel
import JenkinsDetailsViewModel = require('./JenkinsDetailsViewModel'); ///ts:import:generated
///ts:import=JenkinsBoxViewModel
import JenkinsBoxViewModel = require('./JenkinsBoxViewModel'); ///ts:import:generated

/**
 * Main ViewModel that is used to display Jenkins data.
 */
class JenkinsMonitorViewModel implements MonitorViewModel {

    private _details:JenkinsDetailsViewModel;
    private _box:JenkinsBoxViewModel;
    private _model:JenkinsMonitorModel;

    constructor(model:JenkinsMonitorModel) {
        this._model = model;
        this._box = new JenkinsBoxViewModel(this._model);
        this._details = new JenkinsDetailsViewModel(this._model);
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getBox():JenkinsBoxViewModel {
        return this._box;
    }

    public getDetails():JenkinsDetailsViewModel {
        return this._details;
    }

    public getType():string {
        return Types.JENKINS;
    }

    public getHtmlsafeId():string {
        return this._model.getHtmlsafeId();
    }

}

export = JenkinsMonitorViewModel;