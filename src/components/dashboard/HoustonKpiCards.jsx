"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import EditableText from './EditableText';
import { Star, CheckCircle2 } from "lucide-react";
import _ from 'lodash';

const HoustonKPICards = () => {
    const { data, updateData } = useDashboard();
    const kpi = data.houstonKPI;

    const handleUpdate = (field, value) => {
        const newData = _.cloneDeep(data);
        newData.houstonKPI[field] = value;
        updateData(newData);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-[#FFC557] uppercase tracking-widest mb-2">Revenue</span>
                    <span className="text-2xl font-black text-[#FFC557]">
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
                            const fill = s <= Math.floor(ratingNum) ? "fill-yellow-400 text-yellow-400" : s - 0.5 <= ratingNum ? "fill-yellow-400 text-yellow-400 opacity-50" : "text-gray-200";
                            return <Star key={s} className={`w-4 h-4 ${fill}`} />
                        })}
                        </div>
                        {kpi.reviewsCount} reviews
                    </div>
                </div>
                <a href="https://www.google.com/search?sca_esv=614f577eef0ac65e&rlz=1C5MACD_enUS1135US1141&sxsrf=AE3TifPU3HVfLyCEqYDznr240iBGbghHnA:1766583665996&kgmid=/g/11scjw7w1v&q=Rethink+Self+Storage&shndl=30&shem=ptotplc,shrtsdl&source=sh/x/loc/uni/m1/1&kgs=1d69a8a2fc4c8f67&utm_source=ptotplc,shrtsdl,sh/x/loc/uni/m1/1#lrd=0x863edb3009429f59:0x7e91206cfbce70f9,1" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-gray-400 uppercase underline flex items-center gap-1 group">
                    Help us with 5-star reviews <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
            </div>
        </div>
    );
};

export default HoustonKPICards;
