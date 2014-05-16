import NagiosBoxViewModel = require("./NagiosBoxViewModel")
import NagiosDetailsViewModel = require("./NagiosDetailsViewModel")

/**
 * This class represents a {@link NagiosBoxViewModel} and a {@link NagiosDetailsViewModel} that
 * belong together.
 */
class NagiosViewModelTuple {

    private _box:NagiosBoxViewModel;
    private _details:NagiosDetailsViewModel;

    constructor(box:NagiosBoxViewModel, details:NagiosDetailsViewModel) {
        this._box = box;
        this._details = details;
    }

    public getBox():NagiosBoxViewModel {
        return this._box;
    }

    public getDetails():NagiosDetailsViewModel {
        return this._details;
    }

    public getHtmlsafeId():string {
        return this._box.getHtmlsafeId();
    }

}

export = NagiosViewModelTuple;