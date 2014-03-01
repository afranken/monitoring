/**
 * This file contains Interfaces mapping the Sonar responses
 */

declare module SonarJsonResponse {

    interface Jsons {
        responses: Array<Json>;
    }

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

export = SonarJsonResponse;