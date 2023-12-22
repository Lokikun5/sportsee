import React from 'react';
import { useParams } from 'react-router-dom';
import KeyData from './FrontUserData/KeyData';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../data/data';
import '../styles/dashboard.scss';
import SimpleBarChart from './FrontUserData/SimpleBarChart';
import TinyLineChart from './FrontUserData/TinyLineChart';
import UserPerformanceRadarChart from './FrontUserData/UserPerformanceRadarChart';
import ScoreRadialBarChart from "./FrontUserData/ScoreRadialBarChart";

function Dashboard() {
    let { id } = useParams();

    const userData = USER_MAIN_DATA.find(user => user.id === parseInt(id));
    const userActivity = USER_ACTIVITY.find(activity => activity.userId === parseInt(id));
    const userAverageSessions = USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(id));
    const userPerformance = USER_PERFORMANCE.find(performance => performance.userId === parseInt(id));

    if (!userData || !userActivity || !userAverageSessions || !userPerformance) {
        return (
            <section className="dashboard-cont">
                <h1>Utilisateur non trouvé</h1>
            </section>
        );
    }

    const activityData = userActivity.sessions.map(session => ({
        date: session.day,
        kilogram: session.kilogram,
        calories: session.calories
    }));

    const averageSessionData = userAverageSessions.sessions.map(session => ({
        day: session.day,
        sessionLength: session.sessionLength
    }));

    const performanceData = userPerformance.data.map(perf => ({
        subject: userPerformance.kind[perf.kind],
        A: perf.value,
        fullMark: 150
    }));

    const { firstName } = userData.userInfos;
    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userData.keyData;

    return (
        <section className="dashboard-cont">
            <h1>Bonjour <span className="name">{firstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            <div className="d-flex margin-group">
                <div>
                    <SimpleBarChart data={activityData} />
                    <div className="d-flex2">
                        <TinyLineChart data={averageSessionData}/>
                        <UserPerformanceRadarChart data={performanceData}/>
                        <ScoreRadialBarChart/>
                    </div>
                </div>
                <KeyData
                    calorieCount={calorieCount}
                    proteinCount={proteinCount}
                    carbohydrateCount={carbohydrateCount}
                    lipidCount={lipidCount}
                />
            </div>
        </section>
    );
}

export default Dashboard;
