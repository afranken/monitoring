/// <reference path="./../vendor/knockout.d.ts" />
/// <reference path="../jsonInterfaces/Config.d.ts" />
import ko = require('knockout');
import Config = require('Config');
///ts:import=Connector
import Connector = require('../connector/Connector'); ///ts:import:generated

/**
 * Model that accesses data from a backend
 * It's responsibility is to provide access to the underlying data for {@link MonitorViewModel} instances.dd commen
 */
interface MonitorModel {

    /**
     * Update model with data.
     * This method is expected to be used by {@link Connector} implementations after downloading data from a
     * remote system.
     *
     * @param data
     */
    setData(data):void;

    /**
     * This method should be called after creating the Model.
     * The model is expected to use a {@link Connector} to update it's status from a remote system.
     */
    updateStatus(): void;
}

export = MonitorModel;
