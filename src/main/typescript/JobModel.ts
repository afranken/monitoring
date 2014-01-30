/// <reference path="vendor/knockout.d.ts" />

interface JobModel {

    type: string;
    status: KnockoutObservable<string>;

    updateStatus(): void;

}

export = JobModel;
