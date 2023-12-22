import React from 'react';
import '../../styles/TinyLineChart.scss';
import {
    LineChart, Line, XAxis, Tooltip, ResponsiveContainer, Text
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
    console.log(data);
    // Transformer les données pour utiliser les abréviations des jours
    const formattedData = data.map(session => ({
        ...session,
        day: daysOfWeek[session.day - 1], // -1 car les jours dans votre data commencent à 1
    }));

    return (
        <ResponsiveContainer className="line-chart-size">
            <LineChart
                data={formattedData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <XAxis dataKey="day" stroke="#FFFFFF" />
                <Tooltip stroke="#00000" content={<CustomTooltip />} />
                <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" activeDot={{ r: 8 }} />
                <Text x={20} y={30} fill="#FFFFFF" fontSize={20} fontWeight="bold">
                    Durée moyenne des sessions
                </Text>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TinyLineChart;
