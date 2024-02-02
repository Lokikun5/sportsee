import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/SimpleBarChart.scss';

//contenu personnalisé du Tooltip
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{
                backgroundColor: '#E60000',
                padding: '10px',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: '60px'
            }}>
                <p className="label">{`${payload[1].value} kg`}</p>
                <p className="intro">{`${payload[0].value} Kcal`}</p>
            </div>
        );
    }

    return null;
};

const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color: value === "Calories brûlées (kCal)" ? 'black' : color }}>{value}</span>;
};

export default class SimpleBarChart extends PureComponent {
    render() {
        const { data } = this.props;

        // Formatage des données et calcul des maxima
        const formattedData = data.map((item, index) => ({
            name: (index + 1).toString(),
            calories: item.calories,
            poids: item.kilogram
        }));
        const maxCalories = Math.max(...formattedData.map(item => item.calories));
        const maxWeight = Math.max(...formattedData.map(item => item.poids));
        const minWeight = Math.min(...formattedData.map(item => item.poids));

        // Tailles pour la légende et le titre
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
                        domain={[0, maxCalories]}
                        hide={true}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[minWeight - 1, maxWeight + 1]}
                        allowDataOverflow
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        iconType="circle"
                        verticalAlign="top"
                        align="right"
                        wrapperStyle={{
                            lineHeight: `${legendHeight}px`,
                            top: titleHeight - legendHeight,
                            right: 50,
                        }}
                        formatter={renderColorfulLegendText}
                    />
                    <text x={30} y={titleHeight} className="title" textAnchor="left" dominantBaseline="middle">
                        Activité quotidienne
                    </text>
                    <Bar yAxisId="right" dataKey="poids" name="Poids (kg)" fill="#282D30" barSize={7} radius={[10, 10, 0, 0]} />
                    <Bar yAxisId="left" dataKey="calories" name="Calories brûlées (kCal)"  fill="#E60000" barSize={7} radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
