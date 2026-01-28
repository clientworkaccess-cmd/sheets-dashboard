"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';

const LifetimeValueChart = () => {
    const { performanceMetricsData } = useDashboard();

    const formatYAxis = (tickItem) => {
        if (tickItem === 0) return '$0';
        if (tickItem < 1000) return `$${tickItem}`;
        return `$${(tickItem / 1000).toFixed(0)}k`;
    };

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col h-[300px]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-[#8e9aaf] text-xs font-bold uppercase tracking-wider">Customer Lifetime Value</h3>
                <div className="text-xs text-[#8e9aaf] ">
                    <p>{performanceMetricsData?.slice(-1)[0].month || 'N/A'}</p>
                    <p>${performanceMetricsData?.slice(-1)[0].ltv || '0'}</p>
                </div>
            </div>
            <div className="grow w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceMetricsData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid stroke="#f0f0f0" vertical={false} strokeDasharray="3 3"/>
                        <defs>
                            <linearGradient id="colorLtv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="month"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8e9aaf', fontSize: 9, angle: -45, textAnchor: 'end' }}
                            interval={0}
                            height={40}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8e9aaf', fontSize: 10 }}
                            tickFormatter={formatYAxis}
                            width={30}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                            formatter={(value) => [`$${value.toLocaleString()}`, 'LTV']}
                        />
                        <Area
                            type="monotone"
                            dataKey="ltv"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorLtv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LifetimeValueChart;
