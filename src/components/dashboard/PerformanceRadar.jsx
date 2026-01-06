"use client";

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { subject: 'Acquisition', A: 120, B: 110, fullMark: 150 },
    { subject: 'Client Acquisition Cost', A: 98, B: 130, fullMark: 150 },
    { subject: 'Customer Lifetime Value', A: 86, B: 130, fullMark: 150 },
    { subject: 'Expansion', A: 99, B: 100, fullMark: 150 },
    { subject: '# of Occupied Units', A: 85, B: 90, fullMark: 150 },
    { subject: 'Five Star Reviews', A: 65, B: 85, fullMark: 150 },
    { subject: 'Retention', A: 110, B: 90, fullMark: 150 },
    { subject: 'Move in-Move out Ratio', A: 110, B: 90, fullMark: 150 },
];

const PerformanceRadar = () => {
    return (
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center min-h-[400px] relative">
            <div className="w-full flex justify-center mb-4">
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#5fe5e5]" /> Series 1</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#48b9c7]" /> Series 2</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#2a8fb7]" /> Series 3</div>
                </div>
            </div>

            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#4a5568', fontSize: 10, fontWeight: 500 }}
                        />
                        <PolarRadiusAxis hide />
                        <Radar
                            name="Series 1"
                            dataKey="A"
                            stroke="#5fe5e5"
                            fill="#5fe5e5"
                            fillOpacity={0.6}
                        />
                        <Radar
                            name="Series 2"
                            dataKey="B"
                            stroke="#48b9c7"
                            fill="#48b9c7"
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="absolute top-8 left-8 text-2xl font-bold text-gray-200 uppercase pointer-events-none">Retention</div>
            <div className="absolute top-8 right-8 text-2xl font-bold text-gray-200 uppercase pointer-events-none">Acquisition</div>
            <div className="absolute bottom-8 right-8 text-2xl font-bold text-gray-200 uppercase pointer-events-none">Expansion</div>
        </section>
    );
};

export default PerformanceRadar;