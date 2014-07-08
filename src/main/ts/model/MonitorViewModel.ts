/// <reference path="../vendor/knockout.d.ts" />
/// <reference path="../jsonInterfaces/Config.d.ts" />
import ko = require('knockout');
import Config = require('Config');
///ts:import=Connector
import Connector = require('../connector/Connector'); ///ts:import:generated

/**
 * ViewModel used for rendering {@link Config.Monitor} elements.
 * It's responsibility is to transform properties of the underlying {@link MonitorModel} for display.
 */
interface MonitorViewModel {

    /**
     * The type of the Monitor
     */
    getType() :string;

}

export = MonitorViewModel;
