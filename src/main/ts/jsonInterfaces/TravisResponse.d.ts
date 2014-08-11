/**
 * This file contains Interfaces mapping Travis responses
 */

declare module TravisJsonResponse {

    interface Json {
        id: number;
        repository_id: number;
        number: string;
        state: string;
        result: number;
        started_at: Date;
        finished_at: Date;
        duration: number;
        commit: string;
        branch: string;
        message: string;
        event_type: string;
    }
}

declare module 'TravisJsonResponse' {
    export = TravisJsonResponse;
}
