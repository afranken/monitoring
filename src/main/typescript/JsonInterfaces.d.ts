//definition of json

declare module JsonInterfaces {

    interface Application {
        title?: string; //
        sections: Section[];
        settings?: Settings;
    }

    interface Section {
        title: string; //the section title
        url?: string; //section title will use link if configured. (e.g. a Jenkins View)
        hostname: string; //will be used for all Jobs. May be overwritten by Job.
        description?: string;
        jobs?: Job[];
        sections?: Section[];
    }

    interface Job {
        title: string;
        name: string;
        hostname: string; //host the job is configured on. Overwrites Section#host
        type?: string;
    }

    interface Settings {
        hosts?: Host[];
        expiry?: number; //time in hours after which jobs are faded out
    }

    interface Host {
        hostname: string;
        username?: string;
        password?: string;
    }
}

export = JsonInterfaces;