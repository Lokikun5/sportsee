import React, { useState } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, Legend, XAxis } from 'recharts';
import '../../styles/TinyLineChart.scss';

// This array maps numbers to days of the week for easier data handling and display
const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const TinyLineChart = ({ data }) => {
    const [hoveredDayIndex, setHoveredDayIndex] = useState(-1);

    // Format data to use day abbreviations instead of full names or numbers
    const formattedData = data.map(session => ({
        ...session,
        day: daysOfWeek[session.day - 1],
    }));

    // Custom tooltip component that displays the session length when a point is hovered
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const dayIndex = daysOfWeek.indexOf(label);
            setHoveredDayIndex(dayIndex);
            return (
                <div className="custom-tooltip">
                    <p>{`${payload[0].value} min`}</p>
                </div>
            );
        }
        setHoveredDayIndex(-1);
        return null;
    };
    // Calculate shadow width and position based on the hovered day to create a dynamic shadow effect
    const shadowWidth = hoveredDayIndex >= 0 ? `${(100 / daysOfWeek.length) * (daysOfWeek.length - hoveredDayIndex)}%` : '0%';
    const offset = 18;
    const shadowX = hoveredDayIndex >= 0
        ? `calc(${(100 / daysOfWeek.length) * hoveredDayIndex}% + ${offset}px)`
        : '100%';

    return (
        <ResponsiveContainer className="line-chart-size">
            <LineChart
                data={formattedData}
                margin={{
                    top: 50, right: 30, left: 20, bottom: 0,
                }}
                style={{ background: '#FF0000' }}
                strokeWidth={0.4}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#ff5555" stopOpacity={1}/>
                        <stop offset="90%" stopColor="#ff5555" stopOpacity={0.9}/>
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fontWeight: 'bold', fill: '#FFFFFF', opacity: 0.6 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="sessionLength"
                    stroke="url(#colorUv)"
                    strokeWidth={3}
                    activeDot={{ r: 5,  stroke: '#FF0000', strokeWidth: 0, fill: 'white',fillOpacity: 1,strokeOpacity: 0.9 }}
                    dot={false}
                    style={{ zIndex: 3 }}
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
                {/* Dynamic shadow rectangle that changes based on the hovered day */}
                <rect x={shadowX} y="0" width={shadowWidth} height="100%" fill="rgba(0, 0, 0, 0.2)" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TinyLineChart;
