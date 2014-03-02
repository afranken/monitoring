/// <reference path="./vendor/knockout.d.ts" />
import ko = require('knockout');
import Config = require('./jsonInterfaces/Config');
import Connector = require('./connector/Connector');

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

    /**
     * Update model with data.
     * This method is expected to be used by {@link Connector} implementations after downloading data from a
     * remote system.
     *
     * @param data
     */
    setData(data):void;

}

export = MonitorModel;
