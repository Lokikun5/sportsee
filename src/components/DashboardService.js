import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo, getUserActivity, getUserAverageSessions, getUserPerformance } from '../api/apiService';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../data/data';

export const useDashboardData = (useAPIData) => {
    let { id } = useParams();
    
    const [userData, setUserData] = useState(null);
    const [userActivity, setUserActivity] = useState(null);
    const [userAverageSessions, setUserAverageSessions] = useState(null);
    const [userPerformance, setUserPerformance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (useAPIData) {
                const userInfo = await getUserInfo(id);
                const activity = await getUserActivity(id);
                const averageSessions = await getUserAverageSessions(id);
                const performance = await getUserPerformance(id);

                setUserData(userInfo.data.data ? userInfo.data.data : userInfo.data);
                setUserActivity(activity.data.data ? activity.data.data : activity.data);
                setUserAverageSessions(averageSessions.data.data ? averageSessions.data.data : averageSessions.data);
                setUserPerformance(performance.data.data ? performance.data.data : performance.data);
            } else {
                const staticUserData = USER_MAIN_DATA.find(user => user.id === parseInt(id));
                const staticUserActivity = USER_ACTIVITY.find(activity => activity.userId === parseInt(id));
                const staticUserAverageSessions = USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(id));
                const staticUserPerformance = USER_PERFORMANCE.find(performance => performance.userId === parseInt(id));

                setUserData(staticUserData);
                setUserActivity(staticUserActivity);
                setUserAverageSessions(staticUserAverageSessions);
                setUserPerformance(staticUserPerformance);
            }
        };

        fetchData();
    }, [id, useAPIData]);

    return { userData, userActivity, userAverageSessions, userPerformance };
};
