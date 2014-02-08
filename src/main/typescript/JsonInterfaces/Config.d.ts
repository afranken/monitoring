/**
 * These interfaces describe the JSON used to configure the application.
 */
declare module Config {

    interface Application {
        title?: string; //main page title
        sections: Array<Section>;
        configuration?: Configuration;
    }

    interface Section {
        title: string; //the section title
        url?: string; //section title will use link if configured. (e.g. a Jenkins View)
        hostname: string; //will be used for all Jobs. May be overwritten by Job.
        description?: string; //will be displayed below the title
        monitors?: Array<Monitor>;
        sonar?: Array<Sonar>;
        sections?: Array<Section>; //child sections
        elements: string;
    }

    /**
     * Build
     */
    interface Monitor {
        name: string;
        id: string;
        hostname: string; //host the job is configured on. Overwrites Section#hostname
        type?: string;
    }

    /**
     * CodeCoverage
     */
    interface Sonar extends Monitor {
        modules: Array<SonarModule>;
    }

    interface SonarModule {
        name: string;
        id: string;
        hostname?: string;
    }

    interface Configuration {
        hosts?: Array<Host>; //host configuration
        expiry?: number; //time in hours after which jobs are faded out
    }

    interface Host {
        hostname: string; //the hostname this configuration is used for
        protocol?: string; //the protocol to use. Default: http
        username?: string; //the username to use for AJAX calls
        password?: string; //the password to use for AJAX calls
    }

}

export = Config;