/**
 * This file contains Interfaces mapping the Nagios responses
 */
declare module NagiosJsonResponse {

    interface NagiosServices {
        services: Array<NagiosService>;
    }

    interface NagiosService {
        service_status: string;
        service_host: NagiosServiceHost;
        service_description: string;
        service_plugin_output: string;
    }

    interface NagiosServiceHost {
        host_name: string;
    }
}

export = NagiosJsonResponse;
