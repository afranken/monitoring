/**
 * These interfaces describe the JSON used to configure the application.
 */
declare module Config {

    /**
     * This is the root interface
     */
    interface Application {
        title?: string; //main page title
        sections: Array<Section>;
        configuration?: Configuration; //host configuration used throughout the application
    }

        /**
         * A collection of Section or Monitor elements and various display / configuration properties
         */
        interface Section {
            title: string; //the section title
            url?: string; //section title will use link if configured. (e.g. a Jenkins View)
            hostname: string; //will be used for all Monitors. May be overwritten by Monitor.
            description?: string; //will be displayed below the title
            monitors?: Array<Monitor>;
            sections?: Array<Section>; //child sections
        }

            /**
             *
             */
            interface Monitor {
                name: string; //depending on the monitor type, this may be used as a display name, description or a heading
                id: string; //unique id that is used to retrieve information from a backend. (e.g. a Jenkins Job name or a Nagios Host name)
                hostname: string; //host of the backend to retrieve data from. Overwrites Section#hostname
                type?: string; //default: jenkins. Also available: sonar, nagios.
            }

    /**
     * Configures the application. {@see Configuration}
     */
    interface Configuration {
        hosts?: Array<Host>; //host configurations
        expiry?: number; //time in hours after which monitors are faded out
    }

        /**
         * Configuration for one Host. {@see HostConfiguration}
         */
        interface Host {
            hostname: string; //the hostname this configuration is used for
            protocol?: string; //the protocol to use. Default: http
            prefix?: string; //the prefix to use. Default: none
            username?: string; //the username to use for AJAX calls
            password?: string; //the password to use for AJAX calls
        }

}

export = Config;