"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import EditableText from './EditableText';
import { convertToEditorHTML } from '../../lib/editorHelpers';

const HoustonChecklist = () => {
    const { data, updateData, tabs } = useDashboard();
    const checklist = data.houstonChecklist;

    const handleItemsUpdate = (value) => {
        const newData = { ...data };
        newData.houstonChecklist.items = value;
        updateData(newData);
    };

    const handleTitleUpdate = (value) => {
        const newData = { ...data };
        newData.houstonChecklist.title = value;
        updateData(newData);
    };

    return (
        <div className="bg-white rounded-3xl p-8 border shadow-sm h-full font-medium">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-[#FFC557] w-fit">
                <h2 className="text-sm font-bold text-[#FFC557] uppercase tracking-widest">
                    <EditableText value={checklist.title} onSave={handleTitleUpdate} />
                </h2>
            </div>

            <div className="space-y-4 text-[#334155] text-[13px] leading-relaxed">
                <EditableText
                    value={convertToEditorHTML(checklist?.items)}
                    onSave={(val) => handleItemsUpdate(val)}
                    editor
                />
            </div>
        </div>
    );
};

export default HoustonChecklist;
