/**
 * This file contains Interfaces mapping the Sonar responses
 */
declare module SonarJsonResponse {

    /**
     * Sonar will return an Array of these objects
     */
    interface Json {
        id: number;
        name: string;
        date: Date;
        msr: Array<Measurement>;
    }

    interface Measurement {
        key: string;
        val: number;
        frmt_val: string;
    }
}

declare module 'SonarJsonResponse' {
    export = SonarJsonResponse;
}
