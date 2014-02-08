/**
 * This file contains Interfaces mapping the Sonar responses
 */

declare module SonarJsonResponse {

    interface SonarJsons {
        responses: Array<SonarJson>;
    }

    interface SonarJson {
        id: number;
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