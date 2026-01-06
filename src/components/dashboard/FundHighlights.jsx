"use client";

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import EditableText from './EditableText';

const FundHighlights = () => {
    const { data, updateData } = useDashboard();
    const highlights = data.highlights;

    const handleUpdate = (idx, value) => {
        const newData = { ...data };
        newData.highlights.items[idx] = value;
        updateData(newData);
    };

    const handleTitleUpdate = (value) => {
        const newData = { ...data };
        newData.highlights.title = value;
        updateData(newData);
    };

    return (
        <div className="bg-white rounded-3xl p-8 border shadow-sm h-full">
            <div className="flex items-center gap-2 mb-8">
                <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-tight">
                    <EditableText value={highlights.title} onSave={handleTitleUpdate} />
                </h2>
            </div>

            <div className="space-y-6 text-[#475569] text-sm font-medium leading-relaxed">
                {highlights.items.map((item, idx) => (
                    <div key={idx} className={idx < 2 ? "text-[#334155] font-bold" : (idx === 7 ? "text-[#475569]/80 italic" : "")}>
                        <EditableText
                            value={item}
                            onSave={(val) => handleUpdate(idx, val)}
                            multiline={item.length > 50}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FundHighlights;
