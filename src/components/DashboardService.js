import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo, getUserActivity, getUserAverageSessions, getUserPerformance } from '../api/apiService';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../data/data';

// Custom hook to fetch and manage dashboard data
export const useDashboardData = (useAPIData) => {
    let { id } = useParams();

    const [userData, setUserData] = useState(null);
    const [userActivity, setUserActivity] = useState(null);
    const [userAverageSessions, setUserAverageSessions] = useState(null);
    const [userPerformance, setUserPerformance] = useState(null);
    const [error, setError] = useState(null); // Ajout de l'état d'erreur

    useEffect(() => {
        const fetchData = async () => {
            // Asynchronous API calls with error handling
            try {
                if (useAPIData) {

                    const userInfoPromise = getUserInfo(id);
                    const activityPromise = getUserActivity(id);
                    const averageSessionsPromise = getUserAverageSessions(id);
                    const performancePromise = getUserPerformance(id);

                    const [userInfo, activity, averageSessions, performance] = await Promise.all([
                        userInfoPromise,
                        activityPromise,
                        averageSessionsPromise,
                        performancePromise
                    ]);

                    setUserData(userInfo.data.data ? userInfo.data.data : userInfo.data);
                    setUserActivity(activity.data.data ? activity.data.data : activity.data);
                    setUserAverageSessions(averageSessions.data.data ? averageSessions.data.data : averageSessions.data);
                    setUserPerformance(performance.data.data ? performance.data.data : performance.data);
                    setError(null);
                } else {
                    // Données statiques
                    const staticUserData = USER_MAIN_DATA.find(user => user.id === parseInt(id));
                    const staticUserActivity = USER_ACTIVITY.find(activity => activity.userId === parseInt(id));
                    const staticUserAverageSessions = USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(id));
                    const staticUserPerformance = USER_PERFORMANCE.find(performance => performance.userId === parseInt(id));

                    setUserData(staticUserData);
                    setUserActivity(staticUserActivity);
                    setUserAverageSessions(staticUserAverageSessions);
                    setUserPerformance(staticUserPerformance);
                }
            } catch (error) {

                setError('Impossible de charger les données. Veuillez vérifier votre connexion et réessayer.');

                setUserData(null);
                setUserActivity(null);
                setUserAverageSessions(null);
                setUserPerformance(null);
            }
        };

        fetchData();
    }, [id, useAPIData]);

    return { userData, userActivity, userAverageSessions, userPerformance, error }; // Inclusion de l'état d'erreur dans les données renvoyées
};
