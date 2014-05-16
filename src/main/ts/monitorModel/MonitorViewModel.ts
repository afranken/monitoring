/// <reference path="./../vendor/knockout.d.ts" />
import ko = require('knockout');
import Config = require('../jsonInterfaces/Config');
import Connector = require('../connector/Connector');

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
