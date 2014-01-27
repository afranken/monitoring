//definition of json

interface Application {
    title?: string;
    sections?: Section[];
    settings?: Configuration;
}

interface Section {
    title?: string;
    url?: string;
    description?: string;
    jobs?: Job[];
    sections?: SubSection[];
}

interface SubSection extends Section {

}

interface Job {
    title: string;
    url: string;
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
