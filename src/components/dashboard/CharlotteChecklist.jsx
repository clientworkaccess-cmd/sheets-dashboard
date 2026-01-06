"use client";

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import EditableText from './EditableText';
import { CheckCircle2 } from "lucide-react";

const CharlotteChecklist = () => {
    const { data, updateData } = useDashboard();
    const checklist = data.charlotteChecklist;

    const handleUpdate = (idx, value) => {
        const newData = { ...data };
        newData.charlotteChecklist.items[idx].text = value;
        updateData(newData);
    };

    const handleTitleUpdate = (value) => {
        const newData = { ...data };
        newData.charlotteChecklist.title = value;
        updateData(newData);
    };

    return (
        <div className="bg-white rounded-3xl p-8 border shadow-sm h-full font-medium">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-blue-500 w-fit">
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                    <EditableText value={checklist.title} onSave={handleTitleUpdate} />
                </h2>
            </div>

            <div className="space-y-4">
                {checklist.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div className="text-[#334155] text-[13px] leading-relaxed flex-grow">
                            <EditableText
                                value={item.text}
                                onSave={(val) => handleUpdate(idx, val)}
                                multiline
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharlotteChecklist;
