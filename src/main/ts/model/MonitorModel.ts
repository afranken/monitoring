/// <reference path="./../vendor/knockout.d.ts" />
import ko = require('knockout');
import Config = require('../jsonInterfaces/Config');
import Connector = require('../connector/Connector');

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
