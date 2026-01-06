"use client";

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useDashboard } from '@/context/DashboardContext';
import EditableText from './EditableText';
import _ from 'lodash';

const PerformanceRadar = () => {
    const { data, updateData, isEditMode } = useDashboard();
    const radar = data.performanceRadar;

    const handleDataUpdate = (idx, field, value) => {
        const newData = _.cloneDeep(data);
        const numVal = parseInt(value, 10);
        newData.performanceRadar.data[idx][field] = isNaN(numVal) ? 0 : numVal;
        updateData(newData);
    };

    const handleTitleUpdate = (value) => {
        const newData = _.cloneDeep(data);
        newData.performanceRadar.title = value;
        updateData(newData);
    };

    return (
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 h-full flex flex-col relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest pl-2 border-l-4 border-blue-500">
                        <EditableText value={radar.title} onSave={handleTitleUpdate} />
                    </h3>

                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Current</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#0d9488] shadow-[0_0_8px_rgba(13,148,136,0.5)]" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Previous</span>
                        </div>
                    </div>
                </div>

                <div className="flex-grow min-h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radar.data}>
                            <PolarGrid stroke="#f1f5f9" strokeWidth={1} radialLines={true} />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={({ payload, x, y, textAnchor, stroke, radius }) => (
                                    <g transform={`translate(${x},${y})`}>
                                        <text
                                            x={0}
                                            y={0}
                                            textAnchor={textAnchor}
                                            fill="#64748b"
                                            fontSize={10}
                                            fontWeight={500}
                                            className="uppercase tracking-tight"
                                        >
                                            {payload.value}
                                        </text>
                                    </g>
                                )}
                            />
                            {/* Hidden radius axis labels to clean up the center UI as requested */}
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />

                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }}
                            />

                            <Radar
                                name="Current Period"
                                dataKey="A"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="#3b82f6"
                                fillOpacity={0.5}
                                animationDuration={1500}
                            />
                            <Radar
                                name="Previous Period"
                                dataKey="B"
                                stroke="#0d9488"
                                strokeWidth={2}
                                fill="#0d9488"
                                fillOpacity={0.3}
                                animationDuration={1500}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        </section>
    );
};

export default PerformanceRadar;