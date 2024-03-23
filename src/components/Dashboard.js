import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardDataService } from '../components/DashboardService';
import '../styles/dashboard.scss';
import SimpleBarChart from './FrontUserData/SimpleBarChart';
import TinyLineChart from './FrontUserData/TinyLineChart';
import UserPerformanceRadarChart from './FrontUserData/UserPerformanceRadarChart';
import ScoreRadialBarChart from "./FrontUserData/ScoreRadialBarChart";
import KeyData from './FrontUserData/KeyData';

// Toggle to switch between using mocked data and API data.
const useAPIData = false;

function Dashboard() {
    // useParams hook is used to get 'id' from the URL, which identifies the user
    const { id } = useParams();
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(true);
    // useEffect hook to fetch data on component mount and when 'id' changes
    useEffect(() => {
        const service = new DashboardDataService(id, useAPIData);
        service.fetchData().then(() => {
            // Update state with the fetched data
            setDashboardData({
                userData: service.userData,
                userActivity: service.userActivity,
                userAverageSessions: service.userAverageSessions,
                userPerformance: service.userPerformance,
                error: service.error
            });
            setLoading(false); // Set loading to false once data is fetched
        });
    }, [id]);
    // Conditional rendering for the loading state
    if (loading) {
        return <section className="dashboard-cont"><h1>Chargement...</h1></section>;
    }
    // Conditional rendering for an error state
    if (dashboardData.error) {
        return <section className="dashboard-cont"><h1>Erreur</h1><p>{dashboardData.error}</p></section>;
    }
    // Processing the data for charts
    const { firstName } = dashboardData.userData.userInfos;
    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = dashboardData.userData.keyData;
    const todayScore = dashboardData.userData.todayScore;

    const activityData = dashboardData.userActivity.sessions.map(session => ({
        date: session.day,
        kilogram: session.kilogram,
        calories: session.calories
    }));

    const averageSessionData = dashboardData.userAverageSessions.sessions.map(session => ({
        day: session.day,
        sessionLength: session.sessionLength
    }));

    const performanceData = dashboardData.userPerformance.data.map(perf => ({
        subject: dashboardData.userPerformance.kind[perf.kind],
        A: perf.value,
        fullMark: 150
    }));

    return (
        <section className="dashboard-cont">
            <h1>Bonjour <span className="name">{firstName}</span></h1>
            <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
            <div className="d-flex margin-group">
                <div>
                    <SimpleBarChart data={activityData} />
                    <div className="d-flex2">
                        <TinyLineChart data={averageSessionData} />
                        <UserPerformanceRadarChart data={performanceData} />
                        <ScoreRadialBarChart score={todayScore * 100} />
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
