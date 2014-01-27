//definition of json

interface Application {
    title?: string;
    sections?: Section[];
    settings?: Configuration;
}

interface Section {
    title?: string;
    jobList?: Job[];
    subSections?: SubSection[];
}

interface SubSection extends Section {

}

interface Job {
    title?: string;
    url?: string;
}

interface Configuration {
    hosts?: Host[];
    expiry?: number;
}

interface Host {
    hostname?: string;
    username?: string;
    password?: string;
}
