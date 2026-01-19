"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import EditableText from './EditableText';
import { convertToEditorHTML } from '../../lib/editorHelpers';

const FundHighlights = () => {
    const { data, updateData } = useDashboard();
    const highlights = data.highlights;

    const handleUpdate = (value) => {
        const newData = { ...data };
        newData.highlights.items = value;
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
                    <EditableText value={highlights?.title} onSave={handleTitleUpdate} />
                </h2>
            </div>

            <div className="space-y-6 text-[#475569] text-sm font-medium leading-relaxed">
                <EditableText
                    value={convertToEditorHTML(highlights?.items)}
                    onSave={(val) => handleUpdate(val)}
                    editor
                />
            </div>
        </div>
    );
};

export default FundHighlights;
