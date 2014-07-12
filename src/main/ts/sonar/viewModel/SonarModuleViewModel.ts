///ts:import=SonarModuleModel
import SonarModuleModel = require('../model/SonarModuleModel'); ///ts:import:generated
///ts:import=SonarViolationViewModel
import SonarViolationViewModel = require('./SonarViolationViewModel'); ///ts:import:generated

/**
 * Model that represents a list of Sonar modules
 */
class SonarModuleViewModel {

    private _moduleModel: SonarModuleModel;
    private _violationViewModels: Array<SonarViolationViewModel> = [];

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(model: SonarModuleModel) {
        this._moduleModel = model;

        this.init();
    }

    private init(): void {
        this._moduleModel.getViolations().forEach((violation) => {
            this._violationViewModels.push(new SonarViolationViewModel(violation));
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getUrl(): string {
        return this._moduleModel.getUrl();
    }

    public getName(): string {
        return this._moduleModel.getName();
    }

    public getViolationViewModels(): Array<SonarViolationViewModel> {
        return this._violationViewModels;
    }

}

export = SonarModuleViewModel;
