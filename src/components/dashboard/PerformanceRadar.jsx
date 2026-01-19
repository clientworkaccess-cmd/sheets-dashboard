"use client";

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import EditableText from './EditableText';
import _ from 'lodash';

const PerformanceRadar = () => {
    const { data, updateData, isEditMode, performanceRadarData } = useDashboard();

    const chartData = performanceRadarData.data;
    const months = performanceRadarData.months;

    const baseColor = "0, 98, 255"; // Vibrant Blue
    const allColors = [
        { stroke: `rgba(${baseColor}, 0.15)`, fill: `rgba(${baseColor}, 0.05)` }, // Most faded
        { stroke: `rgba(${baseColor}, 0.3)`, fill: `rgba(${baseColor}, 0.08)` },
        { stroke: `rgba(${baseColor}, 0.45)`, fill: `rgba(${baseColor}, 0.12)` },
        { stroke: `rgba(${baseColor}, 0.65)`, fill: `rgba(${baseColor}, 0.18)` },
        { stroke: `rgba(${baseColor}, 0.85)`, fill: `rgba(${baseColor}, 0.25)` },
        { stroke: `rgba(${baseColor}, 1)`, fill: `rgba(${baseColor}, 0.35)` }      // Brightest
    ];

    // Map colors so the latest month always gets the brightest color
    const colors = months.map((_, i) => allColors[5 - (months.length - 1 - i)]);

    const columnKeys = ['A', 'B', 'C', 'D', 'E', 'F'];

    const handleTitleUpdate = (value) => {
        const newData = _.cloneDeep(data);
        newData.performanceRadar.title = value;
        updateData(newData);
    };

    // Custom legend renderer
    const renderLegend = () => (
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2 px-4">
            {months.map((month, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i].stroke }} />
                    <span className="text-[10px] md:text-xs font-medium text-gray-600 whitespace-nowrap">{month}</span>
                </div>
            ))}
        </div>
    );

    return (
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 h-full flex flex-col relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full">
                {/* Legend at top */}
                {renderLegend()}

                {/* Corner Labels - Adjusted for better spacing */}
                <div className="absolute lg:top-[22%] lg:right-[32%] top-[16%] right-[22%] text-right pointer-events-none">
                    <span className="text-secondary-foreground text-sm lg:text-lg tracking-wide font-medium opacity-60">Acquisition</span>
                </div>
                <div className="absolute lg:bottom-[15%] lg:right-[32%] bottom-[12%] right-[22%] text-right pointer-events-none">
                    <span className="text-secondary-foreground text-sm lg:text-lg tracking-wide font-medium opacity-60">Expansion</span>
                </div>
                <div className="absolute lg:top-[50%] lg:left-[28%] transform -translate-y-1/2 top-[55%] left-[12%] pointer-events-none">
                    <span className="text-secondary-foreground text-sm lg:text-lg tracking-wide font-medium opacity-60">Retention</span>
                </div>

                <div className="grow min-h-[350px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                            <PolarGrid
                                stroke="#e0e0e0"
                                strokeWidth={1}
                                radialLines={true}
                                gridType="polygon"
                            />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={({ payload, x, y, textAnchor }) => (
                                    <g transform={`translate(${x},${y})`}>
                                        <text
                                            x={0}
                                            y={0}
                                            textAnchor={textAnchor}
                                            fill="#292929ff"
                                            fontSize={11}
                                            fontWeight={500}
                                            fontStyle="italic"
                                        >
                                            {payload.value}
                                        </text>
                                    </g>
                                )}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 10]}
                                tick={{ fill: '#9ca3af', fontSize: 10 }}
                                tickCount={6}
                                axisLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    fontSize: '12px',
                                    backgroundColor: 'white'
                                }}
                                formatter={(value, name, props) => [value.toFixed(1), months[columnKeys.indexOf(name)]]}
                            />

                            {months.map((month, i) => (
                                <Radar
                                    key={month}
                                    name={columnKeys[i]}
                                    dataKey={columnKeys[i]}
                                    stroke={colors[i].stroke}
                                    strokeWidth={2}
                                    fill={colors[i].fill}
                                    fillOpacity={1}
                                    animationDuration={1500}
                                />
                            ))}
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default PerformanceRadar;