import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const ScoreRadialBarChart = ({ score }) => {

    const data = [{ name: 'Score', uv: score, fill: '#ff0000' }];

    return (
        <div className="c-graph" style={{ width: '517px', height: '263px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <div style={{ color: '#20253A', fontSize: '15px', fontWeight: '600', lineHeight: '24px' }}>Score</div>
            </div>
            <ResponsiveContainer>
                <RadialBarChart cx="50%" cy="50%" innerRadius="90%" outerRadius="100%" barSize={10} data={data} startAngle={90} endAngle={450}>
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                        background
                        dataKey="uv"
                        cornerRadius={10}
                        fill="#ff0000"
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#000' }}>{data[0].uv}%</div>
                <div style={{ color: '#666' }}>de votre objectif</div>
            </div>
        </div>
    );
};

export default ScoreRadialBarChart;
