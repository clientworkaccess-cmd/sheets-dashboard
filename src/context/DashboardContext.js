"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { findIndexByMonthYear, getLastSixMonths, getSelectedMonthRow } from '../lib/dateHelpers';
import _ from 'lodash';

const DashboardContext = createContext();

const INITIAL_DATA = {
    hero: {
        title: "Gamma Income",
        subtitle: "Rethink Self Storage Fund",
        date: "Dec 2025",
        businessPlanLabel: "Original Business Plan",
        charlotte: {
            title: "Charlotte",
            description: "$2.70M • 65,000 sq ft on 6 acres, Seller financing note for 5 years at 6% interest only. Phase 1: 120 relocatable units and 220 first floor units build out ($750K). Lease up to 90% in 1.5 years. Phase 2: Second floor build out 220 units for $400K. Lease up to 90% occupancy by year 4 ~ 524 units."
        },
        houston: {
            title: "Houston",
            description: "$1.50M • 30,000 sq ft on 4 acres. 30,000 sq ft on 4 acres. Bank financing note for 2 years interest only- 46% occupancy. Phase 1: Lease up climate controlled units up to 90% occupancy. Phase 2: Build new non-climate controlled units with RV and boat parking. Lease up ~ 345 units."
        },
        metrics: [
            { label: "Targeted Hold", value: "~ 5 Years" },
            { label: "Targeted Rate of Return", value: "15-25% IRR (Equity Shareclasses)" }
        ]
    },
    portfolio: [
        {
            fund: "Rethink Self Storage Fund",
            property: "24365 TX-124, Hamshire, TX",
            assetType: "Self Storage",
            units: 204,
            market: "Houston, TX",
            closingDate: "12/22/2023",
            purchasePrice: "$1,500,000",
            capitalInvestment: "$300,000",
            loanAmount: "$1,465,000",
            debtType: "Principal and Interest",
            interestRate: "8.25%",
            maturityDate: "1/2030",
        },
        {
            fund: "Rethink Self Storage Fund",
            property: "108 Rush St, Mount Holly, NC",
            assetType: "Self Storage",
            units: 502,
            market: "Charlotte, NC",
            closingDate: "01/04/2024",
            purchasePrice: "$2,100,000",
            capitalInvestment: "$915,000",
            loanAmount: "$2,500,000",
            debtType: "Interest Only",
            interestRate: "7%",
            maturityDate: "1/2029",
        }
    ],
    highlights: {
        title: "Fund Highlights ☀️",
        items: [
            "1 YEAR, 11 MONTHS!",
            "29 NEW CUSTOMERS IN CHARLOTTE AND HOUSTON!",
            "$44,897 in total revenue vs business plan at $54,222 was generated this month across both facilities:",
            "Charlotte contributed $28,212",
            "Houston contributed $16,885",
            "In Charlotte, we started construction on the 2nd floor, completing 49/180 2nd floor self storage units. We reached 227 occupied units vs 164 units 12 months ago. This month, we have 20 move ins and 14 move outs.",
            "In Houston, we had a total of 144 occupied units vs 117 units 12 months ago. November, we saw 9 move-ins and 8 move-outs. Second highest sales month ever! 🔥 🔥 🔥",
            "*** ~250 new units at our sites. Great value add for our property values, but we need revenue to reflect our new inventory ***"
        ]
    },
    mainSales: {
        title: "Rethink - Monthly Sales vs Forecast",
        data: [
            { name: "Jan'24", Charlotte: 8000, Houston: 5000, Forecast: 15000 },
            { name: "Feb'24", Charlotte: 9000, Houston: 5500, Forecast: 16000 },
            { name: "Mar'24", Charlotte: 10000, Houston: 6000, Forecast: 18000 },
            { name: "Apr'24", Charlotte: 12000, Houston: 6500, Forecast: 20000 },
            { name: "May'24", Charlotte: 13000, Houston: 7000, Forecast: 22000 },
            { name: "Jun'24", Charlotte: 15000, Houston: 7500, Forecast: 25000 },
            { name: "Jul'24", Charlotte: 17000, Houston: 8000, Forecast: 28000 },
            { name: "Aug'24", Charlotte: 19000, Houston: 8500, Forecast: 30000 },
            { name: "Sep'24", Charlotte: 21000, Houston: 9000, Forecast: 32000 },
            { name: "Oct'24", Charlotte: 23000, Houston: 9500, Forecast: 35000 },
            { name: "Nov'24", Charlotte: 25000, Houston: 10000, Forecast: 38000 },
            { name: "Dec'24", Charlotte: 20000, Houston: 8000, Forecast: 40000 },
            { name: "Jan'25", Charlotte: 26000, Houston: 10500, Forecast: 42000 },
            { name: "Feb'25", Charlotte: 28000, Houston: 11000, Forecast: 45000 },
            { name: "Mar'25", Charlotte: 30000, Houston: 11500, Forecast: 47000 },
            { name: "Apr'25", Charlotte: 32000, Houston: 12000, Forecast: 50000 },
            { name: "May'25", Charlotte: 31000, Houston: 11500, Forecast: 52000 },
            { name: "Jun'25", Charlotte: 33000, Houston: 12000, Forecast: 54000 },
            { name: "Jul'25", Charlotte: 31112, Houston: 15254, Forecast: 48522 },
            { name: "Aug'25", Charlotte: 33095, Houston: 16075, Forecast: 50322 },
            { name: "Sep'25", Charlotte: 25431, Houston: 15478, Forecast: 51622 },
            { name: "Oct'25", Charlotte: 31395, Houston: 16030, Forecast: 52922 },
            { name: "Nov'25", Charlotte: 28212, Houston: 16685, Forecast: 54222 },
            { name: "Dec'25", Charlotte: 0, Houston: 0, Forecast: 55522 },
        ]
    },
    charlotteChecklist: {
        title: "Charlotte 🏢",
        items: [
            { text: "BUILDING 180 MORE UNITS : We received our order of 176 Boxwell units for the 2nd floor expansion on November 2nd. The first section of 49 units were completed on November 20th. The 2nd section of 80 units are 75% complete today. We will complete the total project in December. 🏗️" },
            { text: "WE SAVED MONEY 🤝 : Steel manufacturer quoted installation at $43,500. Our construction crew we have worked with before said that they will complete this between $21,000-$23,000, saving us more than $20,000. 💰" },
            { text: "FINISHING AHEAD OF SCHEDULE : First 49 self storage units are 100% complete, 4 days ahead of schedule. 🏃‍♂️ 💨" },
            { text: "VERTICAL LIFT TIMELINE ADJUSTED : Management postponed installation to negotiate improved pricing and terms." },
            { text: "WAREHOUSE RE-LEASING STILL IN PROGRESS : We are actively pushing with brokers, LoopNet/Crexi, FB Marketplace to find the right warehousing partner." },
            { text: "NEXT MONTH : Revenue projected in the $28,000-$29,000 range." }
        ]
    },
    houstonChecklist: {
        title: "Houston 🏢",
        items: [
            { text: "BUILDING 180 MORE UNITS : We received our order of 176 Boxwell units for the 2nd floor expansion on November 2nd. The first section of 49 units were completed on November 20th. The 2nd section of 80 units are 75% complete today. We will complete the total project in December. 🏗️" },
            { text: "WE SAVED MONEY 🤝 : Steel manufacturer quoted installation at $43,500. Our construction crew we have worked with before said that they will complete this between $21,000-$23,000, saving us more than $20,000. 💰" },
            { text: "FINISHING AHEAD OF SCHEDULE : First 49 self storage units are 100% complete, 4 days ahead of schedule. 🏃‍♂️ 💨" },
            { text: "VERTICAL LIFT TIMELINE ADJUSTED : Management postponed installation to negotiate improved pricing and terms." },
            { text: "WAREHOUSE RE-LEASING STILL IN PROGRESS : We are actively pushing with brokers, LoopNet/Crexi, FB Marketplace to find the right warehousing partner." },
            { text: "NEXT MONTH : Revenue projected in the $28,000-$29,000 range." }
        ]
    },
    charlotteKPI: {
        revenue: "$28,212",
        units: "227/305",
        rentSqft: "$0.92",
        rating: "4.9/5",
        reviewsCount: 121
    },
    houstonKPI: {
        revenue: "$16,685",
        units: "144/204",
        rentSqft: "$0.85",
        rating: "4.6/5",
        reviewsCount: 41
    },
    charlotteMoveIn: {
        title: "Charlotte Move In vs Move Out",
        data: [
            { name: '1', moveIn: 20, moveOut: 14 },
            { name: '2', moveIn: 18, moveOut: 12 },
            { name: '3', moveIn: 22, moveOut: 15 },
            { name: '4', moveIn: 25, moveOut: 18 },
            { name: '5', moveIn: 19, moveOut: 13 },
            { name: '6', moveIn: 24, moveOut: 16 },
            { name: '7', moveIn: 21, moveOut: 14 },
            { name: '8', moveIn: 28, moveOut: 20 },
            { name: '9', moveIn: 23, moveOut: 17 },
            { name: '10', moveIn: 20, moveOut: 15 },
            { name: '11', moveIn: 20, moveOut: 14 },
        ]
    },
    houstonMoveIn: {
        title: "Houston Move In vs Move Out",
        data: [
            { name: '1', moveIn: 9, moveOut: 8 },
            { name: '2', moveIn: 12, moveOut: 10 },
            { name: '3', moveIn: 15, moveOut: 12 },
            { name: '4', moveIn: 8, moveOut: 7 },
            { name: '5', moveIn: 11, moveOut: 9 },
            { name: '6', moveIn: 14, moveOut: 11 },
            { name: '7', moveIn: 10, moveOut: 8 },
            { name: '8', moveIn: 13, moveOut: 10 },
            { name: '9', moveIn: 16, moveOut: 12 },
            { name: '10', moveIn: 9, moveOut: 8 },
            { name: '11', moveIn: 9, moveOut: 8 },
        ]
    },
    charlotteSales: {
        title: "2025 Charlotte - Monthly Sales vs Forecast",
        data: [
            { name: "Jan'24", Actuals: 5000, Forecast: 8000 },
            { name: "Feb'24", Actuals: 6000, Forecast: 9000 },
            { name: "Mar'24", Actuals: 7000, Forecast: 10000 },
            { name: "Apr'24", Actuals: 9000, Forecast: 12000 },
            { name: "May'24", Actuals: 11000, Forecast: 13000 },
            { name: "Jun'24", Actuals: 14000, Forecast: 15000 },
            { name: "Jul'24", Actuals: 16000, Forecast: 17000 },
            { name: "Aug'24", Actuals: 18000, Forecast: 19000 },
            { name: "Sep'24", Actuals: 20000, Forecast: 21000 },
            { name: "Oct'24", Actuals: 22000, Forecast: 23000 },
            { name: "Nov'24", Actuals: 24000, Forecast: 25000 },
            { name: "Dec'24", Actuals: 21000, Forecast: 20000 },
            { name: "Jan'25", Actuals: 25000, Forecast: 26000 },
            { name: "Feb'25", Actuals: 27000, Forecast: 28000 },
            { name: "Mar'25", Actuals: 29000, Forecast: 30000 },
            { name: "Apr'25", Actuals: 31000, Forecast: 32000 },
            { name: "May'25", Actuals: 30000, Forecast: 31000 },
            { name: "Jun'25", Actuals: 32000, Forecast: 33000 },
            { name: "Jul'25", Actuals: 31112, Forecast: 29740 },
            { name: "Aug'25", Actuals: 33095, Forecast: 31540 },
            { name: "Sep'25", Actuals: 25431, Forecast: 32840 },
            { name: "Oct'25", Actuals: 31395, Forecast: 34140 },
            { name: "Nov'25", Actuals: 28212, Forecast: 35440 },
            { name: "Dec'25", Actuals: 0, Forecast: 36740 },
        ]
    },
    houstonSales: {
        title: "2025 Houston - Monthly Sales vs Forecast",
        data: [
            { name: "Jan'24", Actuals: 5000, Forecast: 8000 },
            { name: "Feb'24", Actuals: 6000, Forecast: 9000 },
            { name: "Mar'24", Actuals: 7000, Forecast: 10000 },
            { name: "Apr'24", Actuals: 9000, Forecast: 12000 },
            { name: "May'24", Actuals: 11000, Forecast: 13000 },
            { name: "Jun'24", Actuals: 14000, Forecast: 15000 },
            { name: "Jul'24", Actuals: 16000, Forecast: 17000 },
            { name: "Aug'24", Actuals: 18000, Forecast: 19000 },
            { name: "Sep'24", Actuals: 20000, Forecast: 21000 },
            { name: "Oct'24", Actuals: 22000, Forecast: 23000 },
            { name: "Nov'24", Actuals: 24000, Forecast: 25000 },
            { name: "Dec'24", Actuals: 21000, Forecast: 20000 },
            { name: "Jan'25", Actuals: 25000, Forecast: 26000 },
            { name: "Feb'25", Actuals: 27000, Forecast: 28000 },
            { name: "Mar'25", Actuals: 29000, Forecast: 30000 },
            { name: "Apr'25", Actuals: 31000, Forecast: 32000 },
            { name: "May'25", Actuals: 30000, Forecast: 31000 },
            { name: "Jun'25", Actuals: 32000, Forecast: 33000 },
            { name: "Jul'25", Actuals: 31112, Forecast: 29740 },
            { name: "Aug'25", Actuals: 33095, Forecast: 31540 },
            { name: "Sep'25", Actuals: 25431, Forecast: 32840 },
            { name: "Oct'25", Actuals: 31395, Forecast: 34140 },
            { name: "Nov'25", Actuals: 28212, Forecast: 35440 },
            { name: "Dec'25", Actuals: 0, Forecast: 36740 },
        ]
    },
    footer: {
        forecastText: "Next Month Forecast: Charlotte $24,000 | Houston $16,000",
        expectationHeading: "Next month, we expect:",
        charlotteExpectation: "Charlotte: We will complete all 180 self storage units - completing 2025 business plan.",
        houstonExpectation: "Houston: September, we completed our 2025 construction business plan. . Now increasing rates and we will focus on marketing our non-climate controlled inventory.",
        revenueExpectation: "We expect revenue to be at $45,000-$46,000 next month."
    },
    majorNews: {
        title: "MAJOR NEWS 🗞️",
        items: [
            "Completed construction on second floor units",
            "Construction plan finished for 2025",
            "Revenue trending upwards with rate increases"
        ]
    },
    performanceRadar: {
        title: "Portfolio Performance Analysis",
        data: [
            { subject: 'Acquisition', A: 120, B: 110, fullMark: 150 },
            { subject: 'Client Acquisition Cost', A: 98, B: 130, fullMark: 150 },
            { subject: 'Customer Lifetime Value', A: 86, B: 130, fullMark: 150 },
            { subject: 'Expansion', A: 99, B: 100, fullMark: 150 },
            { subject: '# of Occupied Units', A: 85, B: 90, fullMark: 150 },
            { subject: 'Five Star Reviews', A: 65, B: 85, fullMark: 150 },
            { subject: 'Retention', A: 110, B: 90, fullMark: 150 },
            { subject: 'Move in-Move out Ratio', A: 110, B: 90, fullMark: 150 },
        ]
    }
};


export const DashboardProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);
    const [selectedMonth, setSelectedMonth] = useState('December');
    const [selectedYear, setSelectedYear] = useState('2025');
    const [isLoading, setIsLoading] = useState(true);

    // Raw Supabase data - stored separately for derived KPI calculations
    const [rawCharlotteData, setRawCharlotteData] = useState([]);
    const [rawHoustonData, setRawHoustonData] = useState([]);

    useEffect(() => {
        const savedLogin = localStorage.getItem('isLoggedIn') === 'true';
        if (savedLogin) setIsLoggedIn(true);
        fetchDashboardData();
    }, []);

    const fetchLiveReviews = async () => {
        try {
            const response = await fetch('https://n8n.srv927950.hstgr.cloud/webhook/de3edd1e-cf15-459f-a488-a5601a5bb1b9');
            const result = await response.json();

            if (result.reviews_data) {
                setData(prevData => {
                    const newData = _.cloneDeep(prevData);

                    result.reviews_data.forEach(item => {
                        if (item.location === "Mount Holly") {
                            newData.charlotteKPI.rating = `${item.rating}/5`;
                            newData.charlotteKPI.reviewsCount = item.review_count;
                        } else if (item.location === "Hampshire") {
                            newData.houstonKPI.rating = `${item.rating}/5`;
                            newData.houstonKPI.reviewsCount = item.review_count;
                        }
                    });

                    return newData;
                });
            }
        } catch (error) {
            console.error('Error fetching live reviews:', error);
        }
    };

    const fetchRealTableData = async () => {
        try {
            // Fetch from all 4 new tables
            const [h24, h25, ho24, ho25] = await Promise.all([
                supabase.from('holly_2024').select('*').order('id', { ascending: true }),
                supabase.from('holly_2025').select('*').order('id', { ascending: true }),
                supabase.from('houston_2024').select('*').order('id', { ascending: true }),
                supabase.from('houston_2025').select('*').order('id', { ascending: true })
            ]);

            const charlotteDataRaw = [...(h24.data || []), ...(h25.data || [])];
            const houstonDataRaw = [...(ho24.data || []), ...(ho25.data || [])];

            // Store raw data for useMemo derived calculations
            setRawCharlotteData(charlotteDataRaw);
            setRawHoustonData(houstonDataRaw);

            setData(prevData => {
                const newData = _.cloneDeep(prevData);

                // 1. Process Main Sales Chart Data
                // We assume both arrays have matching months or we just zip them
                const mainSalesData = charlotteDataRaw.map((cRow, idx) => {
                    const hRow = houstonDataRaw[idx] || {};
                    return {
                        name: cRow.month,
                        Charlotte: parseFloat(cRow.total_revenue) || 0,
                        Houston: parseFloat(hRow.total_revenue) || 0,
                        Forecast: parseFloat(cRow.forecast) + parseFloat(hRow.forecast) || prevData.mainSales.data[idx]?.Forecast || 0,
                    };
                });
                if (mainSalesData.length > 0) newData.mainSales.data = mainSalesData;

                // 2. Process Charlotte Sales Chart Data
                const charlotteSalesData = charlotteDataRaw.map((cRow, idx) => ({
                    name: cRow.month,
                    Actuals: parseFloat(cRow.total_revenue) || 0,
                    Forecast: parseFloat(cRow.forecast) || prevData.charlotteSales.data[idx]?.Forecast || 0,
                }));
                if (charlotteSalesData.length > 0) newData.charlotteSales.data = charlotteSalesData;

                // 3. Process Houston Sales Chart Data
                const houstonSalesData = houstonDataRaw.map((hRow, idx) => ({
                    name: hRow.month,
                    Actuals: parseFloat(hRow.total_revenue) || 0,
                    Forecast: parseFloat(hRow.forecast) || prevData.houstonSales.data[idx]?.Forecast || 0
                }));
                if (houstonSalesData.length > 0) newData.houstonSales.data = houstonSalesData;

                // 4. Process Move In Chart Data (Last 11 months for example)
                const charlotteMoveInData = charlotteDataRaw.map(cRow => ({
                    name: cRow.month,
                    moveIn: parseInt(cRow.move_ins) || 0,
                    moveOut: parseInt(cRow.move_outs) || 0
                }));
                if (charlotteMoveInData.length > 0) newData.charlotteMoveIn.data = charlotteMoveInData;

                const houstonMoveInData = houstonDataRaw.map(hRow => ({
                    name: hRow.month,
                    moveIn: parseInt(hRow.move_ins) || 0,
                    moveOut: parseInt(hRow.move_outs) || 0
                }));
                if (houstonMoveInData.length > 0) newData.houstonMoveIn.data = houstonMoveInData;

                // 5. Update KPI Cards with latest month info
                const latestCharlotte = charlotteDataRaw[charlotteDataRaw.length - 1];
                if (latestCharlotte) {
                    newData.charlotteKPI.revenue = `$${parseFloat(latestCharlotte.total_revenue).toLocaleString()}`;
                    newData.charlotteKPI.units = `${latestCharlotte.total_units_rented}/${latestCharlotte.total_units_available}`;
                    newData.charlotteKPI.rentSqft = `$${latestCharlotte.rent_per_sq_ft}`;
                }

                const latestHouston = houstonDataRaw[houstonDataRaw.length - 1];
                if (latestHouston) {
                    newData.houstonKPI.revenue = `$${parseFloat(latestHouston.total_revenue).toLocaleString()}`;
                    newData.houstonKPI.units = `${latestHouston.total_units_rented}/${latestHouston.total_units_available}`;
                    newData.houstonKPI.rentSqft = `$${latestHouston.rent_per_sq_ft}`;
                }

                return newData;
            });
        } catch (error) {
            console.error('Error fetching real table data:', error);
        }
    };

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const { data: dbData, error } = await supabase
                .from('dashboards')
                .select('content')
                .eq('id', 'main-dashboard')
                .single();

            if (error) {
                console.error('Error fetching from Supabase:', error);
                const savedData = localStorage.getItem('dashboardData');
                if (savedData) {
                    setData(_.merge({}, INITIAL_DATA, JSON.parse(savedData)));
                }
            } else if (dbData && dbData.content) {
                setData(_.merge({}, INITIAL_DATA, dbData.content));
            }

            // Fetch live reviews and real table data to override static content
            await Promise.all([
                fetchLiveReviews(),
                fetchRealTableData()
            ]);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (email, password) => {
        if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setIsEditMode(false);
        localStorage.removeItem('isLoggedIn');
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const updateData = async (newData) => {
        setData(newData);
        localStorage.setItem('dashboardData', JSON.stringify(newData));

        // Sync with Supabase
        try {
            const { error } = await supabase
                .from('dashboards')
                .upsert({ id: 'main-dashboard', content: newData, updated_at: new Date().toISOString() });

            if (error) console.error('Supabase sync error:', error);
        } catch (err) {
            console.error('Failed to sync with Supabase:', err);
        }
    };

    /* -------------------- DERIVED DATA (useMemo) -------------------- */

    // ✅ TABLES → Rolling 6-month window based on selected month/year
    const charlotteTableData = useMemo(
        () => getLastSixMonths(data.charlotteSales.data, selectedMonth, selectedYear),
        [data.charlotteSales.data, selectedMonth, selectedYear]
    );

    const houstonTableData = useMemo(
        () => getLastSixMonths(data.houstonSales.data, selectedMonth, selectedYear),
        [data.houstonSales.data, selectedMonth, selectedYear]
    );

    const mainSalesTableData = useMemo(
        () => getLastSixMonths(data.mainSales.data, selectedMonth, selectedYear),
        [data.mainSales.data, selectedMonth, selectedYear]
    );

    // ✅ KPI → Selected month data only (derives from raw Supabase data)
    const selectedCharlotteKPI = useMemo(() => {
        if (!rawCharlotteData.length) return data.charlotteKPI;

        const monthAbbr = selectedMonth.slice(0, 3);
        const yearAbbr = selectedYear.slice(-2);
        const row = rawCharlotteData.find(r =>
            r.month?.includes(monthAbbr) && r.month?.includes(yearAbbr)
        );

        if (!row) return data.charlotteKPI;

        return {
            revenue: `$${parseFloat(row.total_revenue || 0).toLocaleString()}`,
            units: `${row.total_units_rented || 0}/${row.total_units_available || 0}`,
            rentSqft: `$${row.rent_per_sq_ft || 0}`,
            rating: data.charlotteKPI.rating,       // Keep live reviews data
            reviewsCount: data.charlotteKPI.reviewsCount
        };
    }, [rawCharlotteData, selectedMonth, selectedYear, data.charlotteKPI]);

    const selectedHoustonKPI = useMemo(() => {
        if (!rawHoustonData.length) return data.houstonKPI;

        const monthAbbr = selectedMonth.slice(0, 3);
        const yearAbbr = selectedYear.slice(-2);
        const row = rawHoustonData.find(r =>
            r.month?.includes(monthAbbr) && r.month?.includes(yearAbbr)
        );

        if (!row) return data.houstonKPI;

        return {
            revenue: `$${parseFloat(row.total_revenue || 0).toLocaleString()}`,
            units: `${row.total_units_rented || 0}/${row.total_units_available || 0}`,
            rentSqft: `$${row.rent_per_sq_ft || 0}`,
            rating: data.houstonKPI.rating,         // Keep live reviews data
            reviewsCount: data.houstonKPI.reviewsCount
        };
    }, [rawHoustonData, selectedMonth, selectedYear, data.houstonKPI]);

    /* -------------------- PROVIDER -------------------- */

    return (
        <DashboardContext.Provider value={{
            isLoggedIn,
            isEditMode,
            selectedMonth,
            selectedYear,
            setSelectedMonth,
            setSelectedYear,
            isLoading,

            // 🔹 RAW DATA (Charts use this - never filtered)
            data,
            updateData,

            // 🔹 TABLES (6-month rolling window)
            charlotteTableData,
            houstonTableData,
            mainSalesTableData,

            // 🔹 KPI (Selected month only)
            selectedCharlotteKPI,
            selectedHoustonKPI,

            login,
            logout,
            toggleEditMode
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);