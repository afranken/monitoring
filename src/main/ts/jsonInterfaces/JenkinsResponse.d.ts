/**
 * This file contains Interfaces mapping the Jenkins responses
 */

declare module JenkinsJsonResponse {

    interface JenkinsJson {
        displayName:string;
        name: string;
        url: string;
        color: string;
        lastBuild: LastBuild;
    }

    interface LastBuild {
        actions: Array<Action>;
        timestamp: number;
        building: boolean;
        duration: number;
        id: string;
        number: number;
        result: string;
        url: string;
    }

    interface Action {
        lastBuiltRevision: Revision;
    }

    interface Revision {
        branch: Array<Branch>;
    }

    interface Branch {
        SHA1: string;
        name: string;
    }
}

export = JenkinsJsonResponse;
