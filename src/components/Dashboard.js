import React from 'react';
import { useDashboardData } from '../components/DashboardService';
import '../styles/dashboard.scss';
import SimpleBarChart from './FrontUserData/SimpleBarChart';
import TinyLineChart from './FrontUserData/TinyLineChart';
import UserPerformanceRadarChart from './FrontUserData/UserPerformanceRadarChart';
import ScoreRadialBarChart from "./FrontUserData/ScoreRadialBarChart";
import KeyData from './FrontUserData/KeyData';

// Toggle to switch between using mocked data and API data.
const useAPIData = false;

function Dashboard() {
    // Retrieve data for the dashboard from a custom hook, which could be either mocked data or real API data.
    const { userData, userActivity, userAverageSessions, userPerformance } = useDashboardData(useAPIData);

    // Render a loading state if any data is not yet available.
    if (!userData || !userActivity || !userAverageSessions || !userPerformance) {
        return <section className="dashboard-cont"><h1>Chargement...</h1></section>;
    }
    // Destructure necessary user info and key data for display.
    const { firstName } = userData.userInfos || {};
    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userData.keyData || {};
    const todayScore = userData.todayScore || 0;

    // Transform activity data into a format suitable for the bar chart.
    const activityData = userActivity.sessions?.map(session => ({
        date: session.day,
        kilogram: session.kilogram,
        calories: session.calories
    }));
    // Map average session data for the tiny line chart.
    const averageSessionData = userAverageSessions.sessions?.map(session => ({
        day: session.day,
        sessionLength: session.sessionLength
    }));
// Process performance data for the radar chart. We map it to include the subject name from `kind`.
    const performanceData = Array.isArray(userPerformance.data) ? userPerformance.data.map(perf => ({
        subject: userPerformance.kind[perf.kind],
        A: perf.value,
        fullMark: 150
    })) : [];

    return (
        <section className="dashboard-cont">
            <h1>Bonjour <span className="name">{firstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            <div className="d-flex margin-group">
                <div>
                    {/* Each chart component is passed the relevant data slice to display. */}
                    <SimpleBarChart data={activityData} />
                    <div className="d-flex2">
                        <TinyLineChart data={averageSessionData} />
                        <UserPerformanceRadarChart data={performanceData} />
                        <ScoreRadialBarChart score={todayScore * 100} />
                    </div>
                </div>
                {/* The KeyData component displays user's key nutritional data. */}
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
