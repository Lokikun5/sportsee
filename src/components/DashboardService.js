import { getUserInfo, getUserActivity, getUserAverageSessions, getUserPerformance } from '../api/apiService';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../data/data';

export class DashboardDataService {
    constructor(userId, useAPIData) {
        this.userId = userId;
        this.useAPIData = useAPIData;
        this.userData = null;
        this.userActivity = null;
        this.userAverageSessions = null;
        this.userPerformance = null;
        this.error = null;
    }

    async fetchData() {
        // Asynchronous API calls with error handling

        try {
            if (this.useAPIData) {
                const userInfoPromise = getUserInfo(this.userId);
                const activityPromise = getUserActivity(this.userId);
                const averageSessionsPromise = getUserAverageSessions(this.userId);
                const performancePromise = getUserPerformance(this.userId);

                const [userInfo, activity, averageSessions, performance] = await Promise.all([
                    userInfoPromise,
                    activityPromise,
                    averageSessionsPromise,
                    performancePromise
                ]);

                this.userData = userInfo.data.data ? userInfo.data.data : userInfo.data;
                this.userActivity = activity.data.data ? activity.data.data : activity.data;
                this.userAverageSessions = averageSessions.data.data ? averageSessions.data.data : averageSessions.data;
                this.userPerformance = performance.data.data ? performance.data.data : performance.data;
            } else {
                this.userData = USER_MAIN_DATA.find(user => user.id === parseInt(this.userId));
                this.userActivity = USER_ACTIVITY.find(activity => activity.userId === parseInt(this.userId));
                this.userAverageSessions = USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(this.userId));
                this.userPerformance = USER_PERFORMANCE.find(performance => performance.userId === parseInt(this.userId));
            }
        } catch (error) {
            this.error = 'Impossible de charger les données. Veuillez vérifier votre connexion et réessayer.';
            this.userData = null;
            this.userActivity = null;
            this.userAverageSessions = null;
            this.userPerformance = null;
        }
    }
}
