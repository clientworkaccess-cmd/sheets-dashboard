"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo
} from "react";
import { supabase } from "../lib/supabase";
import { getLastSixMonths } from "../lib/dateHelpers";
import _ from "lodash";

/* -------------------- CONTEXT -------------------- */

const DashboardContext = createContext();

/* -------------------- SAFE DEFAULT STATE -------------------- */

const defaultDashboardData = {
    mainSales: { data: [] },
    charlotteSales: { data: [] },
    houstonSales: { data: [] },
    charlotteMoveIn: { data: [] },
    houstonMoveIn: { data: [] },
    charlotteKPI: {
        revenue: "$0",
        units: "0/0",
        rentSqft: "$0",
        rating: "-",
        reviewsCount: 0
    },
    houstonKPI: {
        revenue: "$0",
        units: "0/0",
        rentSqft: "$0",
        rating: "-",
        reviewsCount: 0
    }
};

/* -------------------- PROVIDER -------------------- */

export const DashboardProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [tabs, setTabs] = useState("fund1");
    const [data, setData] = useState(defaultDashboardData);
    const [selectedMonth, setSelectedMonth] = useState("December");
    const [selectedYear, setSelectedYear] = useState("2025");
    const [isLoading, setIsLoading] = useState(true);

    // Raw Supabase data
    const [rawCharlotteData, setRawCharlotteData] = useState([]);
    const [rawHoustonData, setRawHoustonData] = useState([]);

    /* -------------------- INITIAL LOAD -------------------- */

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);

                const table =
                    tabs === "fund1"
                        ? "dashboards"
                        : "dashboards_duplicate";

                const { data: dbData, error } = await supabase
                    .from(table)
                    .select("content")
                    .limit(1)
                    .single();

                if (error) throw error;

                setData({
                    ...defaultDashboardData,
                    ...dbData.content
                });

                await Promise.all([
                    fetchLiveReviews(),
                    fetchRealTableData()
                ]);
            } catch (err) {
                console.error("Dashboard load failed:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [tabs]);

    /* -------------------- AUTH -------------------- */

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (email, password) => {
        if (
            email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
            password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        ) {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setIsEditMode(false);
        localStorage.removeItem("isLoggedIn");
    };

    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
    };

    /* -------------------- LIVE REVIEWS -------------------- */

    const fetchLiveReviews = async () => {
        try {
            const res = await fetch(
                "https://n8n.srv927950.hstgr.cloud/webhook/de3edd1e-cf15-459f-a488-a5601a5bb1b9"
            );
            const result = await res.json();

            if (!result?.reviews_data) return;

            setData(prev => {
                const newData = _.cloneDeep(prev);

                result.reviews_data.forEach(item => {
                    if (item.location === "Mount Holly") {
                        newData.charlotteKPI.rating = `${item.rating}/5`;
                        newData.charlotteKPI.reviewsCount =
                            item.review_count;
                    }
                    if (item.location === "Hampshire") {
                        newData.houstonKPI.rating = `${item.rating}/5`;
                        newData.houstonKPI.reviewsCount =
                            item.review_count;
                    }
                });

                return newData;
            });
        } catch (err) {
            console.error("Live reviews error:", err);
        }
    };

    /* -------------------- REAL TABLE DATA -------------------- */

    const fetchRealTableData = async () => {
        try {
            const tables =
                tabs === "fund1"
                    ? [
                        "holly_2024",
                        "holly_2025",
                        "houston_2024",
                        "houston_2025"
                    ]
                    : [
                        "catawaba_2024",
                        "catawaba_2025",
                        "rockhill_2024",
                        "rockhill_2025"
                    ];

            const results = await Promise.all(
                tables.map(t =>
                    supabase.from(t).select("*").order("id")
                )
            );

            const charlotteRaw = [
                ...(results[0].data || []),
                ...(results[1].data || [])
            ];

            const houstonRaw = [
                ...(results[2].data || []),
                ...(results[3].data || [])
            ];

            setRawCharlotteData(charlotteRaw);
            setRawHoustonData(houstonRaw);

            setData(prev => {
                const newData = _.cloneDeep(prev);

                newData.charlotteSales.data = charlotteRaw.map(r => ({
                    name: r.month,
                    Actuals: Number(r.total_revenue) || 0,
                    Forecast: Number(r.forecast) || 0
                }));

                newData.houstonSales.data = houstonRaw.map(r => ({
                    name: r.month,
                    Actuals: Number(r.total_revenue) || 0,
                    Forecast: Number(r.forecast) || 0
                }));

                newData.mainSales.data = charlotteRaw.map(
                    (c, i) => ({
                        name: c.month,
                        Location1: Number(c.total_revenue) || 0,
                        Location2:
                            Number(
                                houstonRaw[i]?.total_revenue
                            ) || 0,
                        Forecast:
                            (Number(c.forecast) || 0) +
                            (Number(
                                houstonRaw[i]?.forecast
                            ) || 0)
                    })
                );

                return newData;
            });
        } catch (err) {
            console.error("Table data error:", err);
        }
    };

    /* -------------------- DERIVED DATA -------------------- */

    const charlotteTableData = useMemo(
        () =>
            getLastSixMonths(
                data.charlotteSales?.data ?? [],
                selectedMonth,
                selectedYear
            ),
        [data.charlotteSales, selectedMonth, selectedYear]
    );

    const houstonTableData = useMemo(
        () =>
            getLastSixMonths(
                data.houstonSales?.data ?? [],
                selectedMonth,
                selectedYear
            ),
        [data.houstonSales, selectedMonth, selectedYear]
    );

    const mainSalesTableData = useMemo(
        () =>
            getLastSixMonths(
                data.mainSales?.data ?? [],
                selectedMonth,
                selectedYear
            ),
        [data.mainSales, selectedMonth, selectedYear]
    );

    const selectedCharlotteKPI = useMemo(() => {
        if (!rawCharlotteData.length) return data.charlotteKPI;

        const row = rawCharlotteData.find(r =>
            r.month?.includes(
                selectedMonth.slice(0, 3)
            )
        );

        if (!row) return data.charlotteKPI;

        return {
            ...data.charlotteKPI,
            revenue: `$${Number(
                row.total_revenue || 0
            ).toLocaleString()}`,
            units: `${row.total_units_rented}/${row.total_units_available}`,
            rentSqft: `$${row.rent_per_sq_ft}`
        };
    }, [rawCharlotteData, selectedMonth, data.charlotteKPI]);

    const selectedHoustonKPI = useMemo(() => {
        if (!rawHoustonData.length) return data.houstonKPI;

        const row = rawHoustonData.find(r =>
            r.month?.includes(
                selectedMonth.slice(0, 3)
            )
        );

        if (!row) return data.houstonKPI;

        return {
            ...data.houstonKPI,
            revenue: `$${Number(
                row.total_revenue || 0
            ).toLocaleString()}`,
            units: `${row.total_units_rented}/${row.total_units_available}`,
            rentSqft: `$${row.rent_per_sq_ft}`
        };
    }, [rawHoustonData, selectedMonth, data.houstonKPI]);

    /* -------------------- UPDATE -------------------- */

    const updateData = async newData => {
        setData(newData);

        const table =
            tabs === "fund1"
                ? "dashboards"
                : "dashboards_duplicate";

        await supabase
            .from(table)
            .upsert(
                {
                    id: "main-dashboard",
                    content: newData,
                    updated_at: new Date().toISOString()
                },
                { onConflict: "id" }
            );
    };


    /* -------------------- PROVIDER -------------------- */

    return (
        <DashboardContext.Provider
            value={{
                isLoggedIn,
                isEditMode,
                selectedMonth,
                selectedYear,
                setSelectedMonth,
                setSelectedYear,
                tabs,
                setTabs,
                isLoading,
                data,
                updateData,
                charlotteTableData,
                houstonTableData,
                mainSalesTableData,
                selectedCharlotteKPI,
                selectedHoustonKPI,
                login,
                logout,
                toggleEditMode
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () =>
    useContext(DashboardContext);
