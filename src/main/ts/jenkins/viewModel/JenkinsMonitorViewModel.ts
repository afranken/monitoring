import Types = require('../../util/Types');
import MonitorViewModel = require('../../model/MonitorViewModel');
import JenkinsMonitorModel = require('../model/JenkinsMonitorModel');
import JenkinsDetailsViewModel = require('./JenkinsDetailsViewModel');
import JenkinsBoxViewModel = require('./JenkinsBoxViewModel');

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

    //TODO: shouldn't be used any more, MonitorModel implementations should update themselves...
    public updateStatus():void {
        this._model.updateStatus();
    }

    public getHtmlsafeId():string {
        return this._model.getHtmlsafeId();
    }

}

export = JenkinsMonitorViewModel;