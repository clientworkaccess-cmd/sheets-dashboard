"use client";

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import EditableText from './EditableText';
import { Star } from "lucide-react";

const KPISection = () => {
    const { data, updateData } = useDashboard();
    const kpi = data.charlotteKPI;

    const handleUpdate = (field, value) => {
        const newData = { ...data };
        newData.charlotteKPI[field] = value;
        updateData(newData);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Revenue</span>
                    <span className="text-2xl font-black text-blue-600">
                        <EditableText value={kpi.revenue} onSave={(val) => handleUpdate('revenue', val)} />
                    </span>
                </div>
                <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Units / Total</span>
                    <span className="text-2xl font-black text-gray-800">
                        <EditableText value={kpi.units} onSave={(val) => handleUpdate('units', val)} />
                    </span>
                </div>
                <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Rent / SQFT</span>
                    <span className="text-2xl font-black text-gray-800">
                        <EditableText value={kpi.rentSqft} onSave={(val) => handleUpdate('rentSqft', val)} />
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Help Us With 5 Star Reviews</span>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-gray-600">
                        <EditableText value={kpi.rating} onSave={(val) => handleUpdate('rating', val)} />
                    </span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                </div>
                <a href="#" className="text-[10px] font-bold text-gray-400 uppercase underline flex items-center gap-1 group">
                    Write a review <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
            </div>
        </div>
    );
};

export default KPISection;
