"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const RetentionCards = () => {
    const { retentionMetrics } = useDashboard();

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-center min-h-[140px]">
                <h3 className="text-[#8e9aaf] text-xs font-bold uppercase tracking-wider mb-2">Total Reviews</h3>
                <p className="text-4xl font-bold text-gray-900">{retentionMetrics.totalReviews}</p>
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-center min-h-[140px]">
                <h3 className="text-[#8e9aaf] text-xs font-bold uppercase tracking-wider mb-2">Move In-Move Out Ratio</h3>
                <p className="text-4xl font-bold text-gray-900">{retentionMetrics.ratio}</p>
            </div>
        </div>
    );
};

export default RetentionCards;
