import React from 'react';
import { CheckSquare } from 'lucide-react';

const MajorNews = () => {
    const newsItems = [
        "Completed construction on second floor units",
        "Construction plan finished for 2025",
        "Revenue trending upwards with rate increases"
    ];

    return (
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <h3 className="font-bold text-brand-navy uppercase text-sm flex items-center gap-2">
                    MAJOR NEWS 🗞️
                </h3>
            </div>

            <div className="space-y-6">
                {newsItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                        <div className="mt-1">
                            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <CheckSquare className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <p className="text-[14px] text-gray-600 font-medium leading-tight pt-1">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MajorNews;