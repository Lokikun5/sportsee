import React from 'react';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const UserPerformanceRadarChart = ({ data }) => {
    return (
        <div style={{ background: 'black', width: '258px', height: '253px', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RadarChart  outerRadius={90} width={258} height={253} data={data}>
                <PolarGrid radialLines={false}/>
                <PolarAngleAxis dataKey="subject" stroke="white" tick={{ fill: 'white', fontSize: 10 }}  />
                <PolarRadiusAxis angle={30} domain={[0, 150]}  axisLine={false} tick={false}/>
                <Radar name="Utilisateur" dataKey="A" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
            </RadarChart>
        </div>
    );
};

export default UserPerformanceRadarChart;
