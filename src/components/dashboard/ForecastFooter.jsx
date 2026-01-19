"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import EditableText from './EditableText';
import { Rocket, Megaphone } from "lucide-react";
import { convertToEditorHTML } from '../../lib/editorHelpers';

const ForecastFooter = () => {
    const { data, updateData } = useDashboard();
    const footer = data.footer;

    const handleUpdate = (field, value) => {
        const newData = { ...data };
        newData.footer[field] = value;
        updateData(newData);
    };

    // Combine footer content into HTML for editor
    const getFooterContent = () => {
        if (footer?.content && typeof footer.content === 'string') {
            return footer.content;
        }
        // Convert existing fields to HTML
        let html = '';
        if (footer?.charlotteExpectation) {
            html += `<p>${footer.charlotteExpectation}</p>`;
        }
        if (footer?.houstonExpectation) {
            html += `<p>${footer.houstonExpectation}</p>`;
        }
        if (footer?.revenueExpectation) {
            html += `<p>${footer.revenueExpectation}</p>`;
        }
        return html;
    };

    const handleContentUpdate = (value) => {
        const newData = { ...data };
        newData.footer.content = value;
        updateData(newData);
    };

    return (
        <div className="bg-[#0f172a] rounded-[32px] p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-5 h-5 text-pink-400 fill-pink-400/20" />
                <h2 className="text-sm font-bold text-blue-400">
                    <EditableText value={footer.forecastText} onSave={(val) => handleUpdate('forecastText', val)} />
                </h2>
            </div>

            <div className="space-y-6">
                <div className="flex items-start gap-3">
                    <Megaphone className="w-5 h-5 text-pink-400 shrink-0 mt-1" />
                    <div className="space-y-4 flex-1">
                        <h3 className="font-bold text-sm">
                            <EditableText value={footer.expectationHeading} onSave={(val) => handleUpdate('expectationHeading', val)} />
                        </h3>

                        <div className="text-sm text-gray-300">
                            <EditableText
                                value={getFooterContent()}
                                onSave={(val) => handleContentUpdate(val)}
                                editor
                                textClassName="prose-invert"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForecastFooter;
