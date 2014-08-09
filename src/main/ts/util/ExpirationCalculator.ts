

class ExpirationCalculator {

    private static DEFAULT_OPACITY: number = 1.0;

    /**
     * Get expiration based on the amount of time that passed between the {@link TravisJsonResponse.LastBuild.timestamp} and now.
     *
     * @param expiry time in hours
     * @param buildTimestamp
     *
     * @returns number between 0.25 (=expired) and 1.0 (job ran recently)
     */
    public static calculateExpiration(buildTimestamp: number, expiry: number): number {

        if (buildTimestamp === undefined) {
            return ExpirationCalculator.DEFAULT_OPACITY;
        }

        var expireStyle: number;

        //calculate timestamp and expiration
        var nowTimestamp: number = new Date().getTime();
        var ageMinutes: number = Math.round(nowTimestamp - buildTimestamp) / (1000 * 60);
        var expiredPercent = 1 - (ageMinutes / (expiry * 60));  // 0=expired, 1=fresh

        if (expiredPercent < 0) {

            // age has exceeded ttl
            expireStyle = 0.25;
        } else {

            // age is within ttl
            expireStyle = 0.5 + (expiredPercent * 0.5);
        }

        return expireStyle;
    }
}

export = ExpirationCalculator;