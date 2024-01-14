import React from 'react';
import '../../styles/TinyLineChart.scss';
import {
    LineChart, Line, Tooltip, ResponsiveContainer, Legend, XAxis,
} from 'recharts';

// Mapping des numéros aux jours de la semaine
const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p>{`${payload[0].value} min`}</p>
            </div>
        );
    }

    return null;
};

const TinyLineChart = ({ data }) => {

    // Transformer les données pour utiliser les abréviations des jours
    const formattedData = data.map(session => ({
        ...session,
        day: daysOfWeek[session.day - 1],
    }));

    return (
        <ResponsiveContainer className="line-chart-size">
            <LineChart
                data={formattedData}
                margin={{
                    top: 50, right: 30, left: 20, bottom: 0,
                }}
            >
                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fontWeight: 'bold', fill: '#FFFFFF', opacity: 0.7 }}
                />
                <Tooltip stroke="#00000" content={<CustomTooltip />} />
                <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" activeDot={{ r: 8 }} />
                <Legend
                    verticalAlign="top"
                    align="left"
                    content={() => (
                        <div style={{ color: 'white', opacity: 0.7 }}>
                            Durée moyenne des sessions
                        </div>
                    )}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TinyLineChart;
