"use client";

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import EditableText from './EditableText';
import _ from 'lodash';

const backgroundImage = '/hero-bg.png';

const HeroSection = () => {
    const { data, updateData } = useDashboard();
    const hero = data.hero;

    const handleUpdate = (path, value) => {
        const newData = _.cloneDeep(data);
        _.set(newData, path, value);
        updateData(newData);
    };

    return (
        <div className="relative w-full h-full overflow-hidden rounded-[40px] mb-8 group">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundColor: '#000'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />

            {/* Content */}
            <div className="relative h-full z-10 p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#0f172a]/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                            <div className="text-center">
                                <div className="text-[10px] font-bold text-white leading-tight tracking-tighter uppercase">Gamma</div>
                                <div className="text-[10px] text-gray-400 leading-tight uppercase">Income</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                <EditableText
                                    value={hero.title}
                                    onSave={(val) => handleUpdate('hero.title', val)}
                                />
                            </h2>
                            <p className="text-gray-400 text-sm">
                                <EditableText
                                    value={hero.subtitle}
                                    onSave={(val) => handleUpdate('hero.subtitle', val)}
                                />
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                                <span className="text-xs text-gray-400 font-medium">
                                    <EditableText
                                        value={hero.date}
                                        onSave={(val) => handleUpdate('hero.date', val)}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-3xl border border-white/10">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] p-2 mb-2">
                            <EditableText
                                value={hero.businessPlanLabel}
                                onSave={(val) => handleUpdate('hero.businessPlanLabel', val)}
                            />
                        </span>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                                <h3 className="text-white font-bold">
                                    <EditableText
                                        value={hero.charlotte.title}
                                        onSave={(val) => handleUpdate('hero.charlotte.title', val)}
                                    />
                                </h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                <EditableText
                                    value={hero.charlotte.description}
                                    onSave={(val) => handleUpdate('hero.charlotte.description', val)}
                                    multiline
                                />
                            </p>

                            <div className="flex items-center gap-2 my-3 mt-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                                <h3 className="text-white font-bold">
                                    <EditableText
                                        value={hero.houston.title}
                                        onSave={(val) => handleUpdate('hero.houston.title', val)}
                                    />
                                </h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                <EditableText
                                    value={hero.houston.description}
                                    onSave={(val) => handleUpdate('hero.houston.description', val)}
                                    multiline
                                />
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-center gap-8 pl-8 lg:border-l border-white/10">
                        {hero.metrics.map((metric, idx) => (
                            <div key={idx}>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                                    <EditableText
                                        value={metric.label}
                                        onSave={(val) => handleUpdate(`hero.metrics.${idx}.label`, val)}
                                    />
                                </span>
                                <h4 className="text-xl text-white font-medium">
                                    <EditableText
                                        value={metric.value}
                                        onSave={(val) => handleUpdate(`hero.metrics.${idx}.value`, val)}
                                    />
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
