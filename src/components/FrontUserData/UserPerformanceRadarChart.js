import React from 'react';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const UserPerformanceRadarChart = ({ data }) => {
    return (
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="Utilisateur" dataKey="A" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
        </RadarChart>
    );
};

export default UserPerformanceRadarChart;
