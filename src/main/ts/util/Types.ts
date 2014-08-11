///ts:import=MonitorViewModel
import MonitorViewModel = require('../model/MonitorViewModel'); ///ts:import:generated

/**
 * This class contains declarations of possible types used for creating and
 * identifying {@link MonitorModel} and {@link Connector} instances.
 */
class Types {

    public static SONAR: string = 'sonar';
    public static JENKINS: string = 'jenkins';
    public static NAGIOS: string = 'nagios';
    public static TRAVIS: string = 'travis';

    public static getTypes(): Array<string> {
        return [Types.JENKINS, Types.NAGIOS, Types.SONAR, Types.TRAVIS];
    }

    public static isJenkinsModel(monitorModel: MonitorViewModel): boolean {
        return Types.isJenkins(monitorModel.getType());
    }

    public static isJenkins(type: string): boolean {
        return type === undefined || Types.JENKINS === type;
    }

    public static isNagiosModel(monitorModel: MonitorViewModel): boolean {
        return Types.isNagios(monitorModel.getType());
    }

    public static isNagios(type: string): boolean {
        return type !== undefined && Types.NAGIOS === type;
    }

    public static isSonarModel(monitorModel: MonitorViewModel): boolean {
        return Types.isSonar(monitorModel.getType());
    }

    public static isSonar(type: string): boolean {
        return type !== undefined && Types.SONAR === type;
    }

    public static isTravisModel(monitorModel: MonitorViewModel): boolean {
        return Types.isTravis(monitorModel.getType());
    }

    public static isTravis(type: string): boolean {
        return type !== undefined && Types.TRAVIS === type;
    }

}

export = Types;
