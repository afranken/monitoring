//definition of json

declare module JsonInterfaces {

    interface Application {
        title?: string;
        sections: Section[];
        settings?: Settings;
    }

    interface Section {
        title: string;
        url?: string;
        description?: string;
        jobs?: Job[];
        sections?: Section[];
    }

    interface Job {
        title: string;
        url: string;
        type?: string;
    }

    interface Settings {
        hosts?: Host[];
        expiry?: number;
    }

    interface Host {
        hostname: string;
        username?: string;
        password?: string;
    }
}

export = JsonInterfaces;