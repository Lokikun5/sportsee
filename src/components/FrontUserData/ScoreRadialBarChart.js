import React from 'react';
import '../../styles/ScoreRadialBarChart.scss'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Score', uv: 12, fill: '#ff0000',
    }
];

const ScoreRadialBarChart = () => {
    return (
        <ResponsiveContainer className="score-chart-size">
            <RadialBarChart
                innerRadius="10%"
                outerRadius="80%"
                data={data}
                startAngle={180}
                endAngle={0}
            >
                <RadialBar
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff' }}
                    background
                    clockWise
                    dataKey="uv"
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            </RadialBarChart>
        </ResponsiveContainer>
    );
};

export default ScoreRadialBarChart;
