/**
 * These interfaces describe the JSON used to configure the application.
 */
declare module JsonInterfaces {

    interface Application {
        title?: string; //main page title
        sections: Section[];
        settings?: Settings;
    }

    interface Section {
        title: string; //the section title
        url?: string; //section title will use link if configured. (e.g. a Jenkins View)
        hostname: string; //will be used for all Jobs. May be overwritten by Job.
        description?: string; //will be displayed below the title
        jobs?: Job[];
        sonar?: Sonar[];
        sections?: Section[]; //child sections
        elements: string;
    }

    /**
     * Build
     */
    interface Job {
        name: string;
        id: string;
        hostname: string; //host the job is configured on. Overwrites Section#host
        type?: string;
    }

    /**
     * CodeCoverage
     */
    interface Sonar {
        name: string;
        id?: string; //unused
        hostname?: string;
        modules: SonarModule[];
    }

    interface SonarModule {
        name: string;
        id: string;
        hostname?: string;
    }

    interface SonarViolations {
        msr: SonarViolation[];
    }

    interface SonarViolation {
        key: string;
        val: number;
    }

    /**
     * Infrastructure
     */
    interface Nagios {
        hostnames: string[];
    }



    interface Settings {
        hosts?: Host[]; //host configuration
        expiry?: number; //time in hours after which jobs are faded out
    }

    interface Host {
        hostname: string; //the hostname this configuration is used for
        protocol?: string; //the protocol to use. Default: http
        username?: string; //the username to use for AJAX calls
        password?: string; //the password to use for AJAX calls
    }

}

export = JsonInterfaces;