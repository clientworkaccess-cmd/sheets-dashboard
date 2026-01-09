"use client";

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import EditableText from './EditableText';
import { Rocket, Megaphone, CheckCircle2 } from "lucide-react";

const ForecastFooter = () => {
    const { data, updateData } = useDashboard();
    const footer = data.footer;

    const handleUpdate = (field, value) => {
        const newData = { ...data };
        newData.footer[field] = value;
        updateData(newData);
    };

    return (
        <div className="bg-[#0f172a] rounded-[32px] p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-5 h-5 text-pink-400 fill-pink-400/20" />
                <h2 className="text-sm font-bold text-blue-400">
                    <EditableText value={footer.forecastText} onSave={(val) => handleUpdate('forecastText', val)} />
                </h2>
            </div>

            <div className="space-y-6">
                <div className="flex items-start gap-3">
                    <Megaphone className="w-5 h-5 text-pink-400 shrink-0 mt-1" />
                    <div className="space-y-4">
                        <h3 className="font-bold text-sm">
                            <EditableText value={footer.expectationHeading} onSave={(val) => handleUpdate('expectationHeading', val)} />
                        </h3>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <EditableText value={footer.charlotteExpectation} onSave={(val) => handleUpdate('charlotteExpectation', val)} multiline />
                                <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500/20" />
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <EditableText value={footer.houstonExpectation} onSave={(val) => handleUpdate('houstonExpectation', val)} multiline />
                                <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500/20" />
                            </div>

                            <div className="text-sm text-gray-300 font-medium pt-2">
                                <EditableText value={footer.revenueExpectation} onSave={(val) => handleUpdate('revenueExpectation', val)} multiline />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForecastFooter;
