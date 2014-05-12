import Types = require('../../util/Types');
import MonitorModel = require('../../monitorModel/MonitorModel');
import MonitorViewModel = require('../../monitorModel/MonitorViewModel');
import JenkinsMonitorModel = require('../model/JenkinsMonitorModel');
import JenkinsDetailsModel = require('./JenkinsDetailsViewModel');
import JenkinsBoxViewModel = require('./JenkinsBoxViewModel');

/**
 *
 */
class JenkinsMonitorViewModel implements MonitorViewModel {

    private _details:JenkinsDetailsModel;
    private _box:JenkinsBoxViewModel;
    private _model:JenkinsMonitorModel;

    constructor(model:MonitorModel) {
        this._model = <JenkinsMonitorModel>model;
        this._box = new JenkinsBoxViewModel(this._model);
        this._details = new JenkinsDetailsModel(this._model);
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getBox():JenkinsBoxViewModel {
        return this._box;
    }

    public getDetails():JenkinsDetailsModel {
        return this._details;
    }

    public getType():string {
        return Types.JENKINS;
    }

    public updateStatus():void {
        this._model.updateStatus();
    }

    public getHtmlsafeId():string {
        var _PATTERN:RegExp = new RegExp('\\W','g');
        var _REPLACEMENT_CHAR = '-';
        return this._model.getExternalRef().replace(_PATTERN,_REPLACEMENT_CHAR);
    }

}

export = JenkinsMonitorViewModel;