/// <reference path="./vendor/knockout.d.ts" />
import ko = require('knockout');
import Config = require('./JsonInterfaces/Config');
import Connector = require('./Connector/Connector');

/**
 * Model used for rendering {@link Config.Monitor}
 */
interface MonitorModel {

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

export = MonitorModel;
