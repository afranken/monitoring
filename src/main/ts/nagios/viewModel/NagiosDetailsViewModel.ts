///ts:import=NagiosHostModel
import NagiosHostModel = require('../model/NagiosHostModel'); ///ts:import:generated

/**
 * ViewModel that is used to display Nagios Host Details.
 */
class NagiosDetailsViewModel {

    private _model: NagiosHostModel;

    constructor(model: NagiosHostModel) {
        this._model = model;
    }

    public getHostname(): string {
        return this._model.getHostname();
    }

    public getUrl(): string {
        return this._model.getUrl();
    }

    public getBrokenServices(): Array<string> {
        return this._model.getBrokenServices();
    }

    public getAllServices(): Array<string> {
        return this._model.getAllServices();
    }

}

export = NagiosDetailsViewModel;

