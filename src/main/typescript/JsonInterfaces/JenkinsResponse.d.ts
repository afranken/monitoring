/**
 * This file contains Interfaces mapping the Jenkins responses
 */

declare module JenkinsJsonResponse {

    interface JenkinsJson {
        name: string;
        color: string;
        lastBuild: LastBuild;
    }

    interface LastBuild {
        timestamp: number;
    }
}

export = JenkinsJsonResponse;
