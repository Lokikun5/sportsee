import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/SimpleBarChart.scss';

// Contenu personnalisé du Tooltip
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
                <p className="label">{`${payload[0].value} kg`}</p>
                <p className="intro">{`${payload[1].value} Kcal`}</p>
            </div>
        );
    }

    return null;
};

// Function for colored legendary text
const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color: value === "Calories brûlées (kCal)" ? 'black' : color }}>{value}</span>;
};


const SimpleBarChart = ({ data }) => {
    //Formatting data to fit the bar chart
    const formattedData = data.map((item, index) => ({
        name: (index + 1).toString(),
        calories: item.calories,
        poids: item.kilogram
    }));

    // Calculating maximum and minimum values for chart axes
    const maxCalories = Math.max(...formattedData.map(item => item.calories));
    const maxWeight = Math.max(...formattedData.map(item => item.poids));
    const minWeight = Math.min(...formattedData.map(item => item.poids));

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
                <XAxis dataKey="name"
                       tickLine={false}
                />
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
                    tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    className="set-leng"
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
};

export default SimpleBarChart;
