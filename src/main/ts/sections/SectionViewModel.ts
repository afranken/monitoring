import SectionModel = require('./SectionModel');
import MonitorViewModel = require('../model/MonitorViewModel');

/**
 * This class represents a section.
 * Sections are used to structure the layout into rows and columns.
 */
class SectionViewModel {

    /*
     * 12 is the maximum width of a column/row in the Twitter Bootstrap grid layout.
     */
    private static _MAX_WIDTH:number = 12;

    private _subSections: Array<SectionViewModel>;
    private _sectionModel: SectionModel;
    private _monitorModels: Array<MonitorViewModel>;

    //==================================================================================================================
    // Construct
    //==================================================================================================================

    constructor(subSections:Array<SectionViewModel>, monitorModels:Array<MonitorViewModel>, sectionModel:SectionModel) {
        this._sectionModel = sectionModel;
        this._subSections = subSections;
        this._monitorModels = monitorModels;
    }

    //==================================================================================================================
    // View Layer
    //==================================================================================================================

    /**
     * @returns number the width of a column based on the number of sections
     */
    public getColumnWidth():number {
        return this._subSections.length > 0 ? Math.floor(SectionViewModel._MAX_WIDTH / this._subSections.length) : SectionViewModel._MAX_WIDTH;
    }

    public getTitle():string {
        return this._sectionModel.getTitle();
    }

    public getUrl():string {
        return this._sectionModel.getUrl();
    }

    public getDescription():string {
        return this._sectionModel.getDescription();
    }

    public getMonitorModels():Array<MonitorViewModel> {
        return this._monitorModels;
    }

    public getSections():Array<SectionViewModel> {
        return this._subSections;
    }

}

export = SectionViewModel;
