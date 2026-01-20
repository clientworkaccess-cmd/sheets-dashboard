import React from 'react';
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useDashboard } from "../../context/DashboardContext";
import LoginModal from "./LoginModal";
import { useState } from "react";

import { handleExport } from "../../lib/exportHandler";

const DashboardHeader = () => {
    const {
        isLoggedIn,
        isEditMode,
        toggleEditMode,
        logout,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        setTabs,
        isLoading,
        isSaving,
        updateDataToSupabase
    } = useDashboard();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-3xl shadow-sm border mb-4">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-[#1e293b]">Rethink Self Storage Fund</h1>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => setTabs("fund1")}
                    className="h-9 rounded-xl text-gray-400 hover:text-red-500"
                >
                    Fund 1
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setTabs("fund2")}
                    className="h-9 rounded-xl text-gray-400 hover:text-red-500"
                >
                    Fund 2
                </Button>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Year</span>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="rounded-xl bg-gray-50 border-gray-100">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Month</span>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="rounded-xl bg-gray-50 border-gray-100">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="January">January</SelectItem>
                            <SelectItem value="February">February</SelectItem>
                            <SelectItem value="March">March</SelectItem>
                            <SelectItem value="April">April</SelectItem>
                            <SelectItem value="May">May</SelectItem>
                            <SelectItem value="June">June</SelectItem>
                            <SelectItem value="July">July</SelectItem>
                            <SelectItem value="August">August</SelectItem>
                            <SelectItem value="September">September</SelectItem>
                            <SelectItem value="October">October</SelectItem>
                            <SelectItem value="November">November</SelectItem>
                            <SelectItem value="December">December</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2 mt-5">
                    <Select onValueChange={(val) => handleExport(val)}>
                        <SelectTrigger className="rounded-xl border-gray-100 min-w-[100px]">
                            <SelectValue placeholder="Export" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PNG">PNG</SelectItem>
                            <SelectItem value="JPEG">JPEG</SelectItem>
                            <SelectItem value="PDF">PDF</SelectItem>
                        </SelectContent>
                    </Select>

                    {isLoggedIn ? (
                        <div className="flex gap-2">
                            <Button
                                onClick={isEditMode ? updateDataToSupabase : toggleEditMode}
                                className={`h-9 rounded-xl px-6 font-bold transition-all ${isEditMode
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-[#0f172a] text-white"
                                    }`}
                                disabled={isLoading || isSaving}
                            >
                                {isSaving ? "Saving..." : isEditMode ? "Save Changes" : "Edit Dashboard"}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={logout}
                                className="h-9 rounded-xl text-gray-400 hover:text-red-500"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => setIsLoginOpen(true)}
                            className="h-9 rounded-xl bg-[#0f172a] text-white px-6 font-bold"
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </div>
    );
};

export default DashboardHeader;
