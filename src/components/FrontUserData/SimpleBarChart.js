import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/SimpleBarChart.scss';

export default class SimpleBarChart extends PureComponent {
    render() {
        const { data } = this.props; // Récupération des données passées en tant que props

        // Formatage des données
        const formattedData = data.map((item, index) => ({
            name: (index + 1).toString(),
            uv: item.calories,
            pv: item.kilogram
        }));

        // Calcul des valeurs de poids minimum, médian et maximum
        const weights = formattedData.map(item => item.pv);
        const minWeight = Math.min(...weights);
        const maxWeight = Math.max(...weights);
        const medianWeight = weights.sort((a, b) => a - b)[Math.floor(weights.length / 2)];

        const legendHeight = 25;
        const titleHeight = 30;

        return (
            <ResponsiveContainer className="size">
                <BarChart
                    width={500}
                    height={300}
                    data={formattedData}
                    margin={{
                        top: legendHeight + titleHeight,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        domain={[minWeight, maxWeight]}
                        ticks={[minWeight, medianWeight, maxWeight]}
                    />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend
                        iconType="circle"
                        verticalAlign="top"
                        align="right"
                        wrapperStyle={{
                            lineHeight: `${legendHeight}px`,
                            top: titleHeight - legendHeight,
                            right: 50,
                        }}
                    />
                    <text x={30} y={titleHeight} className="title" textAnchor="left" dominantBaseline="middle">
                        Activité quotidienne
                    </text>
                    <Bar yAxisId="left" dataKey="pv" name="Poids (kg)" fill="#282D30" barSize={7} radius={[10, 10, 0, 0]} />
                    <Bar yAxisId="right" dataKey="uv" name="Calories brûlées (kCal)" fill="#E60000" barSize={7} radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
