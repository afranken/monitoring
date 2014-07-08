///ts:import=NagiosHostModel
import NagiosHostModel = require('../model/NagiosHostModel'); ///ts:import:generated

/**
 * ViewModel that is used to display the Nagios host overview box.
 */
class NagiosBoxViewModel {

    private _model:NagiosHostModel;

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(model:NagiosHostModel) {
        this._model = model;
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getName():string {
        return this._model.getName();
    }

    public getCss(): string {
        return this._model.getCss();
    }

    public getHtmlsafeId():string {
        return this._model.getHtmlsafeId();
    }

}

export = NagiosBoxViewModel;
