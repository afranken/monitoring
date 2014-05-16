import SonarViolationModel = require('../model/SonarViolationModel');
import SonarViolationViewModel = require('./SonarViolationViewModel');

/**
 * Model that represents a type of sonar violation belonging to a sonar module
 */
class SonarViolationViewModel {

    private _violationModel:SonarViolationModel;

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(model:SonarViolationModel) {
        this._violationModel = model;
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getCss():string {
        return this._violationModel.getCss();
    }

    public getCount():number {
        return this._violationModel.getCount();
    }

}

export = SonarViolationViewModel;