"use client";

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import EditableText from './EditableText';
import _ from 'lodash';

const PerformanceRadar = () => {
    const { data, updateData, isEditMode } = useDashboard();
    const radar = data.performanceRadar;

    // Transform data with new subject names matching screenshot
    const chartData = [
        { subject: '# of Leads', A: 8, B: 6, C: 4, D: 2, E: 1, F: 0, fullMark: 10 },
        { subject: 'Client Acquisition Cost', A: 7, B: 5, C: 3, D: 2, E: 1, F: 0, fullMark: 10 },
        { subject: 'Customer Lifetime Value', A: 6, B: 7, C: 5, D: 4, E: 3, F: 2, fullMark: 10 },
        { subject: '# of Occupied Units', A: 5, B: 6, C: 4, D: 2, E: 1, F: 0, fullMark: 10 },
        { subject: 'Five Star Reviews', A: 4, B: 5, C: 6, D: 2, E: 1, F: 0, fullMark: 10 },
        { subject: 'Move in-Move out Ratio', A: 7, B: 4, C: 5, D: 2, E: 1, F: 0, fullMark: 10 },
    ];

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

    // Custom legend renderer
    const renderLegend = () => (
        <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(64, 224, 208, 0.8)' }} />
                <span className="text-xs font-medium text-gray-600">Jul 25</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0, 191, 255, 0.8)' }} />
                <span className="text-xs font-medium text-gray-600">Aug 25</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0, 105, 148, 0.9)' }} />
                <span className="text-xs font-medium text-gray-600">Sep 25</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(64, 224, 208, 0.8)' }} />
                <span className="text-xs font-medium text-gray-600">Oct 25</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0, 191, 255, 0.8)' }} />
                <span className="text-xs font-medium text-gray-600">Nov 25</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0, 105, 148, 0.9)' }} />
                <span className="text-xs font-medium text-gray-600">Dec 25</span>
            </div>
        </div>
    );

    return (
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 h-full flex flex-col relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full">
                {/* Legend at top */}
                {renderLegend()}

                {/* Corner Labels */}
                <div className="absolute lg:top-[20%] lg:right-[35%] top-[15%] right-[25%] text-right">
                    <span className="text-lg text-secondary-foreground tracking-wide">Acquisition</span>
                </div>
                <div className="absolute lg:bottom-[13%] lg:right-[35%] bottom-[10%] right-[25%] text-right">
                    <span className="text-lg text-secondary-foreground tracking-wide">Expansion</span>
                </div>
                <div className="absolute lg:top-[50%] lg:left-[30%] transform -translate-y-1/2 top-[55%] left-[15%]">
                    <span className="text-lg text-secondary-foreground tracking-wide">Retention</span>
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
                                            fontWeight={400}
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
                            />

                            {/* Series 1 - Outer layer (lightest cyan/turquoise) */}
                            <Radar
                                name="Jul 25"
                                dataKey="A"
                                stroke="rgba(64, 224, 208, 1)"
                                strokeWidth={2}
                                fill="rgba(64, 224, 208, 0.4)"
                                fillOpacity={1}
                                animationDuration={1500}
                            />

                            {/* Series 2 - Middle layer (medium blue) */}
                            <Radar
                                name="Aug 25"
                                dataKey="B"
                                stroke="rgba(0, 191, 255, 1)"
                                strokeWidth={2}
                                fill="rgba(0, 191, 255, 0.5)"
                                fillOpacity={1}
                                animationDuration={1500}
                            />

                            {/* Series 3 - Inner layer (darkest teal) */}
                            <Radar
                                name="Sep 25"
                                dataKey="C"
                                stroke="rgba(0, 105, 148, 1)"
                                strokeWidth={2}
                                fill="rgba(0, 105, 148, 0.6)"
                                fillOpacity={1}
                                animationDuration={1500}
                            />
                            {/* Series 4 - Inner layer (darkest teal) */}
                            <Radar
                                name="Oct 25"
                                dataKey="D"
                                stroke="rgba(0, 105, 148, 1)"
                                strokeWidth={2}
                                fill="rgba(0, 105, 148, 0.6)"
                                fillOpacity={1}
                                animationDuration={1500}
                            />
                            {/* Series 5 - Inner layer (darkest teal) */}
                            <Radar
                                name="Nov 25"
                                dataKey="E"
                                stroke="rgba(0, 105, 148, 1)"
                                strokeWidth={2}
                                fill="rgba(0, 105, 148, 0.6)"
                                fillOpacity={1}
                                animationDuration={1500}
                            />
                            {/* Series 6 - Inner layer (darkest teal) */}
                            <Radar
                                name="Dec 25"
                                dataKey="F"
                                stroke="rgba(0, 105, 148, 1)"
                                strokeWidth={2}
                                fill="rgba(0, 105, 148, 0.6)"
                                fillOpacity={1}
                                animationDuration={1500}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default PerformanceRadar;