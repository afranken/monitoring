///ts:import=Types
import Types = require('../../util/Types'); ///ts:import:generated
///ts:import=MonitorViewModel
import MonitorViewModel = require('../../model/MonitorViewModel'); ///ts:import:generated
///ts:import=SonarModuleViewModel
import SonarModuleViewModel = require('./SonarModuleViewModel'); ///ts:import:generated
///ts:import=SonarMonitorModel
import SonarMonitorModel = require('../model/SonarMonitorModel'); ///ts:import:generated

/**
 * Model that represents a list of Sonar modules
 */
class SonarMonitorViewModel implements MonitorViewModel {

    private _monitorModel: SonarMonitorModel;
    private _moduleViewModels: Array<SonarModuleViewModel> = [];

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(model: SonarMonitorModel) {
        this._monitorModel = model;

        this.init();
    }

    private init(): void {
        this._monitorModel.getModuleModels().forEach((moduleModel) => {
            this._moduleViewModels.push(new SonarModuleViewModel(moduleModel));
        });
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    public getUrl(): string {
        return this._monitorModel.getUrl();
    }

    public getName(): string {
        return this._monitorModel.getName();
    }

    public getModuleViewModels(): Array<SonarModuleViewModel> {
        return this._moduleViewModels;
    }

    public getType(): string {
        return Types.SONAR;
    }

}

export = SonarMonitorViewModel;
