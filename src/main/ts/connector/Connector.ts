import MonitorModel = require('../monitorModel/MonitorModel');

/**
 * Connectors get data from remote services
 */
interface Connector {

    /**
     * Get remote data for given MonitorModel
     *
     * @param model the model to add the retrieved data to
     */
    getRemoteData(model: MonitorModel): void;

}

export = Connector;