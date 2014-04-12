/**
 * These interfaces describe the JSON used to configure the application.
 */
declare module Config {

    /**
     * This is the root interface
     */
    interface Application {
        /**
         * main page title
         */
        title?: string;
        /**
         * child sections
         */
        sections: Array<Section>;
        /**
         * host configuration used throughout the application
         */
        configuration?: Configuration;
    }

        /**
         * A collection of Section or Monitor elements and various display / configuration properties
         */
        interface Section {
            /**
             * the section title
             */
            title?: string;
            /**
             * section title will use link if configured. (e.g. a Jenkins View)
             */
            url?: string;
            /**
             * will be used for all Monitors. May be overwritten by Monitor.
             */
            hostname?: string;
            /**
             * will be displayed below the title
             */
            description?: string;
            /**
             * List of Monitors
             */
            monitors?: Array<Monitor>;
            /**
             * child sections
             */
            sections?: Array<Section>;
        }

            /**
             * A backend service to monitor
             */
            interface Monitor {
                /**
                 * depending on the monitor type, this may be used as a display name, description or a heading
                 */
                name?: string;
                /**
                 * reference that is used to retrieve information from a backend.
                 */
                externalRef: any;
                /**
                 * host of the backend to retrieve data from. Overwrites Section#hostname
                 */
                hostname?: string;
                /**
                 * default: jenkins. Also available: sonar, nagios.
                 */
                type?: string;
            }

            /**
             * Monitor that maps to one external service
             */
            interface SimpleMonitor extends Monitor {
                externalRef: string;
            }

            /**
             * Monitor that maps to several external services
             */
            interface ExtendedMonitor extends Monitor {
                externalRef: ExternalRef[];
            }

                /**
                 * Reference to an External service.
                 */
                interface ExternalRef {
                    /**
                     * depending on the monitor type, this may be used as a display name, description or a heading
                     */
                    name?: string;
                    /**
                     * unique id that is used to retrieve information from a backend. (e.g. a Jenkins Job name or a Nagios Host name)
                     */
                    id: string;
                }

    /**
     * Application-wide config. {@see Configuration}
     */
    interface Configuration {
        /**
         * host configurations
         */
        hosts?: Array<Host>;
        /**
         * time in hours after which (Jenkins-)monitors are completely faded out
         */
        expiry?: number;
        /**
         * Customize the layout of the page.
         */
        theme?: Theme;
    }

        interface Theme {
            /**
             * Add link to a custom css file here. This file will be loaded in addition to and after all existing CSS files.
             */
            customCss?:string;
        }

        /**
         * Configuration for one Host. {@see HostConfiguration}
         */
        interface Host {
            /**
             * the hostname this configuration is used for
             */
            hostname: string;
            /**
             * the protocol to use. Default: http
             */
            protocol?: string;
            /**
             * the port to use. Default: none (i.e. 80)
             */
            port?: string;
            /**
             * the prefix to use. Default: none
             */
            prefix?: string;
            /**
             * the username to use for AJAX calls
             */
            username?: string;
            /**
             * the password to use for AJAX calls
             */
            password?: string;
        }

}

export = Config;