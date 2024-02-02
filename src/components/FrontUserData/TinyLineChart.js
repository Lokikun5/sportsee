import React from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, Legend, XAxis } from 'recharts';
import '../../styles/TinyLineChart.scss';

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
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#ffff" stopOpacity={0.8}/>
                        <stop offset="90%" stopColor="#ffff" stopOpacity={0.5}/>
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fontWeight: 'bold', fill: '#FFFFFF', opacity: 0.7 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <rect x="70%" y="0" width="30%" height="100%" fill="rgba(0, 0, 0, 0.2)" />
                <Line
                    type="monotone"
                    dataKey="sessionLength"
                    stroke="url(#colorUv)"
                    strokeWidth={3}
                    activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }}
                    dot={{ stroke: 'white', strokeWidth: 3, r: 5, fill: 'white', fillOpacity: 0, strokeOpacity: 0 }}
                />
                <Legend
                    verticalAlign="top"
                    align="left"
                    content={() => (
                        <div style={{ color: 'white', opacity: 0.7 }}>
                            Durée moyenne des <br/> sessions
                        </div>
                    )}
                />
                {/* Assombrissement de la partie droite du graphique */}
                <rect x="70%" y="0" width="30%" height="100%" fill="rgba(0, 0, 0, 0.2)" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TinyLineChart;
