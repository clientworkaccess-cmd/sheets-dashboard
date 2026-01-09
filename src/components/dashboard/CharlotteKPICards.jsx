"use client";

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import EditableText from './EditableText';
import { Star, CheckCircle2 } from "lucide-react";
import _ from 'lodash';

const CharlotteKPICards = () => {
    const { data, updateData } = useDashboard();
    const kpi = data.charlotteKPI;

    const handleUpdate = (field, value) => {
        const newData = _.cloneDeep(data);
        newData.charlotteKPI[field] = value;
        updateData(newData);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-[#3A8DDE] uppercase tracking-widest mb-2">Revenue</span>
                    <span className="text-2xl font-black text-[#3A8DDE]">
                        <EditableText value={kpi.revenue} onSave={(val) => handleUpdate('revenue', val)} />
                    </span>
                </div>
                <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Units / Total</span>
                    <span className="text-2xl font-black text-gray-800">
                        <EditableText value={kpi.units} onSave={(val) => handleUpdate('units', val)} />
                    </span>
                </div>
                <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Rent / SQFT</span>
                    <span className="text-2xl font-black text-gray-800">
                        <EditableText value={kpi.rentSqft} onSave={(val) => handleUpdate('rentSqft', val)} />
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-gray-600">
                        <EditableText value={kpi.rating} onSave={(val) => handleUpdate('rating', val)} />
                    </span>
                    <div className="flex gap-2 items-center text-xs text-accent-foreground/80 font-semibold">
                        <div className='flex gap-0.5'>
                            {[1, 2, 3, 4, 5].map((s) => {
                                const ratingNum = parseFloat(kpi.rating);
                                const fill = s <= Math.floor(ratingNum) ? "fill-yellow-400 text-yellow-400" : s - 0.5 <= ratingNum ? "fill-yellow-400 text-yellow-400 opacity-70" : "text-gray-200";
                                return <Star key={s} className={`w-4 h-4 ${fill}`} />
                            })}
                        </div>
                        {kpi.reviewsCount} reviews
                    </div>
                </div>
                <a href="https://www.google.com/search?q=rethink%20self%20storage%20mt%20holly%20google%20review&sca_esv=83deed022e42a993&sxsrf=ADLYWIJT7V59ej603cNYgd98_2tOJv4hVw:1727879941596&ei=BVv9ZoKBJKGs5NoP3JDm4AU&ved=0ahUKEwjCl4ix9u-IAxUhFlkFHVyIGVwQ4dUDCA8&uact=5&oq=rethink%20self%20storage%20mt%20holly%20google%20review&gs_lp=Egxnd3Mtd2l6LXNlcnAiK3JldGhpbmsgc2VsZiBzdG9yYWdlIG10IGhvbGx5IGdvb2dsZSByZXZpZXcyChAhGKABGMMEGAoyChAhGKABGMMEGAoyChAhGKABGMMEGApI7B9QowhYwR1wAngAkAEAmAG4BaABqRmqAQczLTYuMS4xuAEDyAEA-AEBmAIDoAL9AsICDhAAGIAEGLADGIYDGIoFwgILEAAYgAQYsAMYogTCAgsQABiwAxiiBBiJBZgDAIgGAZAGBpIHBTIuMy0xoAe-Lg&sclient=gws-wiz-serp#lrd=0x8856bd8111d56e6d:0xd666f08a7a01a443,1" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-gray-400 uppercase underline flex items-center gap-1 group">
                    Help us with 5-star reviews <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
            </div>
        </div>
    );
};

export default CharlotteKPICards;
