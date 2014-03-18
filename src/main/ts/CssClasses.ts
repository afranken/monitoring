/**
 * This class contains CSS classes compatible with {@link http://getbootstrap.com/}.
 */
class CssClasses {

    /**
     * Many elements are displayed as alerts.
     */
    public static BASIC: string = ' alert ';

    /**
     * Basic classes used by {@link JenkinsMonitorModel} and {@link NagiosMonitorModel}
     */
    public static BASIC_CLASSES: string = ' jobstatus ' + CssClasses.BASIC;

    public static SUCCESS: string = ' alert-success ';
    public static WARNING: string = ' alert-warning ';
    public static FAILURE: string = ' alert-danger ';
    public static DISABLED: string = ' alert-disabled ';

    /**
     * If a {@link JenkinsMonitorModel} points to a Jenknis job that is still running, this class is used.
     * The UI element will start to pulsate. (see {@link Application#registerPulsateBindingHandler}
     */
    public static BUILDING: string = ' status-building ';


    public static SUCCESS_PROGRESS_BUILDING = ' progress-bar progress-bar-success ';
    public static WARNING_PROGRESS_BUILDING = ' progress-bar progress-bar-warning ';
    public static FAILURE_PROGRESS_BUILDING = ' progress-bar progress-bar-danger ';

}

export = CssClasses;