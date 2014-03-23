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
     * Classes used for progress bars
     */
    public static SUCCESS_PROGRESS_BUILDING = ' progress-bar progress-bar-success ';
    public static WARNING_PROGRESS_BUILDING = ' progress-bar progress-bar-warning ';
    public static FAILURE_PROGRESS_BUILDING = ' progress-bar progress-bar-danger ';

}

export = CssClasses;