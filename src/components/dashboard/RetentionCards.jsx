"use client";

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';

const RetentionCards = () => {
    const { performanceMetricsData } = useDashboard();

    const baseColor = "58, 141, 222";


    return (
        <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col h-[300px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#8e9aaf] text-xs font-bold uppercase tracking-wider">Total Reviews</h3>
                    <div className="text-xs text-[#8e9aaf] ">
                    <p>{performanceMetricsData?.slice(-1)[0].month || 'N/A'}</p>
                    <p>{performanceMetricsData?.slice(-1)[0].reviews || '0'}</p>
                </div>
                </div>
                <div className="grow w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid stroke="#f0f0f0" vertical={false} strokeDasharray="3 3" />
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
                                dataKey="reviews"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#8e9aaf', fontSize: 10 }}
                                domain={[0, 'auto']}
                                width={30}
                            />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                            />
                            <Scatter data={performanceMetricsData} fill={`rgba(${baseColor}, 1)`}>
                                {performanceMetricsData.map((entry, index) => {
                                    const opacity = 0.15 + (index / performanceMetricsData.length) * 0.85;
                                    return <Cell key={`cell-${index}`} fill={`rgba(${baseColor}, ${opacity})`} />;
                                })}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col h-[300px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#8e9aaf] text-xs font-bold uppercase tracking-wider">Move In-Move Out Ratio</h3>
                    <div className="text-xs text-[#8e9aaf] ">
                    <p>{performanceMetricsData?.slice(-1)[0].month || 'N/A'}</p>
                    <p>{performanceMetricsData?.slice(-1)[0].ratio.toFixed(2) || '0.00'}</p>
                </div>
                </div>
                <div className="grow w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceMetricsData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid stroke="#f0f0f0" vertical={false} strokeDasharray="3 3" />
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
                                width={30}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                formatter={(value) => [`${value?.toFixed(2)}`, 'Ratio']}
                            />
                            <Area
                                type="monotone"
                                dataKey="ratio"
                                stroke="#3a8dde"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorCac)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RetentionCards;
