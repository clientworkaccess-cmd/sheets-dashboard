"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import EditableText from './EditableText';
import _ from 'lodash';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Line,
    ComposedChart,
} from 'recharts';

const MainSalesChart = () => {
    const { data, updateData, isEditMode, mainSalesTableData } = useDashboard();
    const chartData = data.mainSales.data;  // Full data for chart (never filtered)
    const tableData = mainSalesTableData;   // 6-month window for table (filtered)

    const handleDataUpdate = (idx, field, value) => {
        const newData = _.cloneDeep(data);
        const numVal = parseFloat(value.replace(/[^0-9.-]+/g, ""));
        newData.mainSales.data[idx][field] = isNaN(numVal) ? 0 : numVal;
        updateData(newData);
    };

    const handleTitleUpdate = (value) => {
        const newData = _.cloneDeep(data);
        newData.mainSales.title = value;
        updateData(newData);
    };

    // Helper for formatting currency in the table
    const formatCurrency = (val) => `$${val.toLocaleString()}`;

    return (
        <div className="bg-white rounded-3xl p-8 border shadow-sm h-full flex flex-col">
            <div className="flex justify-center mb-6">
                <h2 className="text-xl font-bold text-[#1e293b]">
                    <EditableText value={data.mainSales.title} onSave={handleTitleUpdate} />
                </h2>
            </div>

            <div className="bg-black rounded-2xl p-6 flex-grow overflow-hidden">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                            <XAxis
                                dataKey="name"
                                stroke="#94a3b8"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="Charlotte" stackId="a" fill="#3A8DDE" radius={[0, 0, 0, 0]} barSize={12} />
                            <Bar dataKey="Houston" stackId="a" fill="#FFC557" radius={[2, 2, 0, 0]} barSize={12} />
                            <Line dataKey="Forecast" stroke="#64748b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="rect"
                                wrapperStyle={{ paddingTop: "20px" }}
                                formatter={(value) => <span className="text-xs text-blue-100 uppercase font-bold tracking-widest">{value}</span>}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mt-8 overflow-x-auto">
                <table className="w-full text-[10px] text-gray-500 uppercase font-bold">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left py-2">Metric</th>
                            {tableData.map((d, i) => (
                                <th key={i} className="text-right py-2">{d.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        <tr className="border-b border-gray-50">
                            <td className="py-2 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#3A8DDE]" /> Charlotte
                            </td>
                            {tableData.map((d, i) => (
                                <td key={i} className={`text-right py-2`}>
                                    <EditableText
                                        value={formatCurrency(d.Charlotte)}
                                        onSave={(val) => {
                                            // Find correct index in full data
                                            const idx = chartData.findIndex(row => row.name === d.name);
                                            if (idx !== -1) handleDataUpdate(idx, 'Charlotte', val);
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="py-2 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#FFC557]" /> Houston
                            </td>
                            {tableData.map((d, i) => (
                                <td key={i} className={`text-right py-2`}>
                                    <EditableText
                                        value={formatCurrency(d.Houston)}
                                        onSave={(val) => {
                                            const idx = chartData.findIndex(row => row.name === d.name);
                                            if (idx !== -1) handleDataUpdate(idx, 'Houston', val);
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <td className="py-2">Total</td>
                            {tableData.map((d, i) => (
                                <td key={i} className="text-right py-2">
                                    {formatCurrency(d.Charlotte + d.Houston)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-400" /> Total Forecast
                            </td>
                            {tableData.map((d, i) => (
                                <td key={i} className="text-right py-2">
                                    <EditableText
                                        value={formatCurrency(d.Forecast)}
                                        onSave={(val) => {
                                            const idx = chartData.findIndex(row => row.name === d.name);
                                            if (idx !== -1) handleDataUpdate(idx, 'Forecast', val);
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainSalesChart;
