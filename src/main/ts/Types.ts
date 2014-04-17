import MonitorModel = require('./monitorModel/MonitorModel');

/**
 * This class contains declarations of possible types used for creating and
 * identifying {@link MonitorModel} and {@link Connector} instances.
 */
class Types {

    public static SONAR: string = 'sonar';
    public static JENKINS: string = 'jenkins';
    public static NAGIOS: string = 'nagios';

    public static getTypes():Array<string> {
        return [Types.JENKINS,Types.NAGIOS,Types.SONAR];
    }

    public static isJenkinsModel(monitorModel:MonitorModel):boolean {
        return Types.isJenkins(monitorModel.getType());
    }

    public static isJenkins(type:string):boolean {
        return type === undefined || Types.JENKINS === type;
    }

    public static isNagiosModel(monitorModel:MonitorModel):boolean {
        return Types.isNagios(monitorModel.getType());
    }

    public static isNagios(type:string):boolean {
        return type !== undefined && Types.NAGIOS === type;
    }

    public static isSonarModel(monitorModel:MonitorModel):boolean {
        return Types.isSonar(monitorModel.getType());
    }

    public static isSonar(type:string):boolean {
        return type !== undefined && Types.SONAR === type;
    }

}

export = Types;