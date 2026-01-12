"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import _ from 'lodash';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Line,
    ComposedChart,
    Legend,
} from 'recharts';
import EditableText from './EditableText';

const MoveInChart = ({ type = 'charlotte' }) => {
    const { data, updateData, isEditMode } = useDashboard();

    // Choose data based on type
    const chartKey = type === 'charlotte' ? 'charlotteMoveIn' : 'houstonMoveIn';
    const chartSection = data[chartKey];
    const chartData = chartSection.data;

    const handleTitleUpdate = (value) => {
        const newData = _.cloneDeep(data);
        newData[chartKey].title = value;
        updateData(newData);
    }
    return (
        <div className="bg-white rounded-3xl p-8 border shadow-sm h-full">
            <div className="flex justify-center mb-6">
                <h2 className="text-[10px] font-bold text-black/80 uppercase tracking-widest">
                    <EditableText value={chartSection.title} onSave={handleTitleUpdate} />
                </h2>
            </div>

            <div className="h-[200px] w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            stroke="#616a77ff"
                            fontSize={8}
                            tickLine={false}
                            axisLine={false}
                            angle={-45}
                            textAnchor="end"
                            interval={0}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            ticks={[7, 14, 28]}
                        />
                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="moveIn" fill={chartKey === 'charlotteMoveIn' ? "#3A8DDE" : "#FFC557"} radius={[4, 4, 0, 0]} barSize={20} />
                        <Line type="monotone" dataKey="moveOut" stroke="#BADF93" strokeWidth={2} dot={{ fill: '#0d9488', r: 4 }} />
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            iconType="rect"
                            wrapperStyle={{ paddingTop: "20px" }}
                            formatter={(value) => <span className="text-[9px] text-black/80 uppercase font-bold tracking-widest">{value}</span>}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MoveInChart;
