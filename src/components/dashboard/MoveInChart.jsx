"use client";

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
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
} from 'recharts';
import EditableText from './EditableText';

const MoveInChart = () => {
    const { data, updateData, isEditMode } = useDashboard();
    const chartData = data.moveInChart.data;

    const handleUpdate = (idx, field, value) => {
        const newData = { ...data };
        const numVal = parseInt(value, 10);
        newData.moveInChart.data[idx][field] = isNaN(numVal) ? 0 : numVal;
        updateData(newData);
    };

    const handleTitleUpdate = (value) => {
        const newData = { ...data };
        newData.moveInChart.title = value;
        updateData(newData);
    };

    return (
        <div className="bg-white rounded-3xl p-8 border shadow-sm h-full">
            <div className="flex justify-center mb-6">
                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <EditableText value={data.moveInChart.title} onSave={handleTitleUpdate} />
                </h2>
            </div>

            <div className="h-[200px] w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            hide
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
                        <Bar dataKey="moveIn" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                        <Line type="monotone" dataKey="moveOut" stroke="#0d9488" strokeWidth={2} dot={{ fill: '#0d9488', r: 4 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {isEditMode && (
                <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 max-h-[150px] overflow-y-auto">
                    <table className="w-full text-[10px] text-gray-400 font-bold uppercase">
                        <thead>
                            <tr>
                                <th className="text-left py-2">Point</th>
                                <th className="text-right py-2">Move In</th>
                                <th className="text-right py-2">Move Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chartData.map((d, i) => (
                                <tr key={i} className="border-t border-gray-200">
                                    <td className="py-2">{d.name}</td>
                                    <td className="text-right py-2">
                                        <EditableText value={String(d.moveIn)} onSave={(val) => handleUpdate(i, 'moveIn', val)} />
                                    </td>
                                    <td className="text-right py-2">
                                        <EditableText value={String(d.moveOut)} onSave={(val) => handleUpdate(i, 'moveOut', val)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MoveInChart;
