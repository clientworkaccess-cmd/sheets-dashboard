"use client";

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import EditableText from './EditableText';
import { CheckSquare } from 'lucide-react';

const MajorNews = () => {
    const { data, updateData } = useDashboard();
    const majorNews = data.majorNews;

    const handleUpdate = (idx, value) => {
        const newData = { ...data };
        newData.majorNews.items[idx] = value;
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

            <div className="space-y-6">
                {majorNews.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                        <div className="mt-1">
                            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <CheckSquare className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <div className="text-[14px] text-gray-600 font-medium leading-tight pt-1 flex-grow">
                            <EditableText
                                value={item}
                                onSave={(val) => handleUpdate(idx, val)}
                                multiline={item.length > 50}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MajorNews;