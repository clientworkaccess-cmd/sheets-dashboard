"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

const EditableText = ({ value, onSave, multiline = false, className = "", textClassName = "" , disabled = false}) => {
    const { isEditMode } = useDashboard();

    if (isEditMode) {
        if (multiline) {
            return (
                <Textarea
                    value={value}
                    onChange={(e) => onSave(e.target.value)}
                    className={`min-h-[100px] bg-white border-blue-400 text-black ${className}`}
                />
            );
        }
        return (
            <Input
                value={value}
                onChange={(e) => onSave(e.target.value)}
                className={`bg-white border-blue-400 text-black h-auto py-1 px-2 ${className}`}
                disabled={disabled}
            />
        );
    }

    return <span className={textClassName}>{value}</span>;
};

export default EditableText;
