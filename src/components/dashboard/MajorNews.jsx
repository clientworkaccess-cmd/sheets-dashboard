"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import EditableText from './EditableText';
import { CheckSquare } from 'lucide-react';
import { convertToEditorHTML } from '../../lib/editorHelpers';

const MajorNews = () => {
    const { data, updateData } = useDashboard();
    const majorNews = data.majorNews;

    const handleItemsUpdate = (value) => {
        const newData = { ...data };
        newData.majorNews.items = value;
        updateData(newData);
    };

    const handleTitleUpdate = (value) => {
        const newData = { ...data };
        newData.majorNews.title = value;
        updateData(newData);
    };

    return (
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <h3 className="font-bold text-[#0f172a] uppercase text-sm flex items-center gap-2">
                    <EditableText value={majorNews.title} onSave={handleTitleUpdate} />
                </h3>
            </div>

            <div className="space-y-6 text-[14px] text-gray-600 font-medium leading-tight">
                <EditableText
                    value={convertToEditorHTML(majorNews?.items)}
                    onSave={(val) => handleItemsUpdate(val)}
                    editor
                />
            </div>
        </section>
    );
};

export default MajorNews;