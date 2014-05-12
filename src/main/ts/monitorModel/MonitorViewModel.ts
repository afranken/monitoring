/// <reference path="./../vendor/knockout.d.ts" />
import ko = require('knockout');
import Config = require('../jsonInterfaces/Config');
import Connector = require('../connector/Connector');

/**
 * ViewModel used for rendering {@link Config.Monitor}
 */
interface MonitorViewModel {

    /**
     * The type of the Monitor
     */
    getType() :string;

    /**
     * This method will be called after rendering the Model.
     * The model is expected to use a {@link Connector} to update it's status from a remote system.
     */
    updateStatus(): void;

}

export = MonitorViewModel;
