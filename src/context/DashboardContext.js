"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo
} from "react";
import { supabase } from "../lib/supabase";
import { getLastSixMonths, getLast24Months } from "../lib/dateHelpers";
import _ from "lodash";

/* -------------------- CONTEXT -------------------- */

const DashboardContext = createContext();

/* -------------------- SAFE DEFAULT STATE -------------------- */

const defaultDashboardData = {
    "hero": {
        "date": "",
        "title": "",
        "houston": {
            "title": "",
            "description": ""
        },
        "metrics": [
            {
                "label": "",
                "value": ""
            }
        ],
        "subtitle": "",
        "charlotte": {
            "title": "",
            "description": ""
        },
        "businessPlanLabel": ""
    },
    "footer": {
        "forecastText": "",
        "expectationHeading": "",
        "houstonExpectation": "",
        "revenueExpectation": "",
        "charlotteExpectation": ""
    },
    "mainSales": {
        "data": [],
        "title": ""
    },
    "majorNews": {
        "items": [],
        "title": ""
    },
    "portfolio": [],
    "highlights": {
        "items": "",
        "title": ""
    },
    "houstonKPI": {
        "units": "",
        "rating": "",
        "revenue": "",
        "rentSqft": "",
        "reviewsCount": "",
        "availableUnits": ""
    },
    "charlotteKPI": {
        "units": "",
        "rating": "",
        "revenue": "",
        "rentSqft": "",
        "reviewsCount": "",
        "availableUnits": ""
    },
    "houstonSales": {
        "data": [],
        "title": ""
    },
    "houstonMoveIn": {
        "data": [],
        "title": ""
    },
    "charlotteSales": {
        "data": [],
        "title": ""
    },
    "charlotteMoveIn": {
        "data": [],
        "title": ""
    },
    "houstonChecklist": {
        "items": [],
        "title": ""
    },
    "performanceRadar": {
        "data": [],
        "title": ""
    },
    "charlotteChecklist": {
        "items": "",
        "title": ""
    }
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const today = new Date();

// 1 month pehle ki date
const previousMonthDate = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
);

/* -------------------- PROVIDER -------------------- */

export const DashboardProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [tabs, setTabs] = useState("fund1");
    const [data, setData] = useState(defaultDashboardData);
    const [selectedMonth, setSelectedMonth] = useState(months[previousMonthDate.getMonth()]);
    const [selectedYear, setSelectedYear] = useState(previousMonthDate.getFullYear().toString());
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

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
                    .eq("id", selectedMonth.slice(0, 3) + " " + selectedYear)
                    .single();

                if (error) throw error;

                if (dbData) {
                    setData({
                        ...defaultDashboardData,
                        ...dbData.content
                    });
                } else {
                    setData(defaultDashboardData);
                }

                await Promise.all([
                    fetchRealTableData()
                ]);
            } catch (err) {
                console.error("Dashboard load failed:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [tabs, selectedMonth, selectedYear]);

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
                        Charlotte: Number(c.total_revenue) || 0,
                        Houston:
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

                // Create MoveIn/MoveOut data from 24-month raw data
                // Handles both snake_case (move_in) and camelCase (moveIn) keys
                newData.charlotteMoveIn.data = charlotteRaw.map(r => ({
                    name: r.month,
                    moveIn: Number(r.move_ins || r.moveIn) || 0,
                    moveOut: Number(r.move_outs || r.moveOut) || 0
                }));

                newData.houstonMoveIn.data = houstonRaw.map(r => ({
                    name: r.month,
                    moveIn: Number(r.move_ins || r.moveIn) || 0,
                    moveOut: Number(r.move_outs || r.moveOut) || 0
                }));

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
            r.month?.toLowerCase().includes(
                selectedMonth.slice(0, 3).toLowerCase()
            ) && r.month?.includes(selectedYear)
        );

        if (!row) return data.charlotteKPI;

        // Helper to parse currency/number
        const parseVal = (val) => {
            if (typeof val === 'number') return val;
            if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
            return 0;
        };

        return {
            ...data.charlotteKPI,
            revenue: `$${parseVal(row.total_revenue).toLocaleString()}`,
            units: `${row.total_units_rented}/${row.total_units_available}`,
            rentSqft: `$${row.rent_per_sq_ft}`,
            reviewsCount: `${row.review_count ? row.review_count : 0}`,
            rating: `${row.rating ? row.rating : 0}`
        };
    }, [rawCharlotteData, selectedMonth, selectedYear, data.charlotteKPI]);

    const selectedHoustonKPI = useMemo(() => {
        if (!rawHoustonData.length) return data.houstonKPI;

        const row = rawHoustonData.find(r =>
            r.month?.toLowerCase().includes(
                selectedMonth.slice(0, 3).toLowerCase()
            ) && r.month?.includes(selectedYear)
        );

        if (!row) return data.houstonKPI;

        const parseVal = (val) => {
            if (typeof val === 'number') return val;
            if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
            return 0;
        };

        return {
            ...data.houstonKPI,
            revenue: `$${parseVal(row.total_revenue).toLocaleString()}`,
            units: `${row.total_units_rented}/${row.total_units_available}`,
            rentSqft: `$${row.rent_per_sq_ft}`,
            reviewsCount: `${row.review_count ? row.review_count : 0}`,
            rating: `${row.rating ? row.rating : 0}`
        };
    }, [rawHoustonData, selectedMonth, selectedYear, data.houstonKPI]);

    const performanceRadarData = useMemo(() => {
        const charlotteSix = getLastSixMonths(
            rawCharlotteData,
            selectedMonth,
            selectedYear
        );
        const houstonSix = getLastSixMonths(
            rawHoustonData,
            selectedMonth,
            selectedYear
        );

        const parseVal = (val) => {
            if (typeof val === 'number') return val;
            if (typeof val === 'string')
                return parseFloat(val.replace(/[^0-9.-]+/g, '')) || 0;
            return 0;
        };

        const subjects = [
            { subject: '# of Leads', key: 'no_of_leads' },
            { subject: 'Client Acquisition Cost', key: 'Client Acquisition Cost' },
            { subject: 'Customer Lifetime Value', key: 'Life Time Value' },
            { subject: '# of Occupied Units', key: 'total_units_rented' },
            { subject: 'Move in-Move out Ratio', key: 'ratio' }
        ];

        // Recharts column keys
        const columnKeys = ['A', 'B', 'C', 'D', 'E', 'F'];

        // Month labels
        const months = charlotteSix.map(m => {
            const date = m.month || m.name || '';
            const parts = date.split(' ');
            if (parts.length === 2) {
                return `${parts[0].slice(0, 3)} ${parts[1].slice(-2)}`;
            }
            return date;
        });

        const result = subjects.map(s => {
            const row = { subject: s.subject };

            columnKeys.forEach((key, i) => {
                if (i < charlotteSix.length) {
                    const c = charlotteSix[i] || {};
                    const h = houstonSix[i] || {};

                    let val = 0;

                    // 1️⃣ Move in / Move out Ratio
                    if (s.key === 'ratio') {
                        const moveIns =
                            parseVal(c.move_ins) + parseVal(h.move_ins);
                        const moveOuts =
                            parseVal(c.move_outs) + parseVal(h.move_outs);

                        val = moveOuts > 0 ? moveIns / moveOuts : 0;

                        // 2️⃣ AVERAGE metrics
                    } else if (
                        s.key === 'Client Acquisition Cost'
                    ) {
                        const values = [
                            parseVal(c[s.key]),
                            parseVal(h[s.key])
                        ].filter(v => !isNaN(v));

                        const total = values.reduce((a, b) => a + b, 0);
                        val = values.length ? total / values.length : 0;

                        // 3️⃣ SUM metrics
                    } else if (
                        s.key === 'Life Time Value'
                    ) {
                        const values = [
                            parseVal(c[s.key]),
                            parseVal(h[s.key])
                        ].filter(v => !isNaN(v));

                        const total = values.reduce((a, b) => a + b, 0);
                        val = values.length ? total / values.length : 0;

                        // 3️⃣ SUM metrics
                    } else if (
                        s.key === 'no_of_leads'
                    ) {
                        val =
                            parseVal(c[s.key]) +
                            parseVal(h[s.key]);

                    } else if (
                        s.key === 'total_units_rented'
                    ) {
                        val =
                            parseVal(c[s.key]) +
                            parseVal(h[s.key]);

                    } else {
                        val = 0;
                    }

                    row[`${key}_raw`] = val;
                    row[key] = val;
                } else {
                    row[key] = 0;
                }
            });

            return row;
        });

        return { data: result, months };
    }, [
        rawCharlotteData,
        rawHoustonData,
        selectedMonth,
        selectedYear
    ]);

    const performanceMetricsData = useMemo(() => {
        const charlotte24Months = getLast24Months(
            rawCharlotteData,
            selectedMonth,
            selectedYear
        );
        const houston24Months = getLast24Months(
            rawHoustonData,
            selectedMonth,
            selectedYear
        );

        const parseVal = (val) => {
            if (typeof val === 'number') return val;
            if (typeof val === 'string')
                return parseFloat(val.replace(/[^0-9.-]+/g, '')) || 0;
            return 0;
        };

        return charlotte24Months.map((c, i) => {
            const h = houston24Months[i] || {};
            const name = c.month || c.name || '';

            // Format name to "Jan 24"
            let formattedName = name;
            const parts = name.split(' ');
            if (parts.length === 2) {
                formattedName = `${parts[0].slice(0, 3)} ${parts[1].slice(-2)}`;
            }

            return {
                month: formattedName,
                leads: parseVal(c.no_of_leads) + parseVal(h.no_of_leads),
                occupiedUnits: parseVal(c.total_units_rented) + parseVal(h.total_units_rented),
                cac: (parseVal(c['Client Acquisition Cost']) + parseVal(h['Client Acquisition Cost'])) / 2,
                ltv: (parseVal(c['Life Time Value']) + parseVal(h['Life Time Value'])) / 2
            };
        });
    }, [rawCharlotteData, rawHoustonData, selectedMonth, selectedYear]);

    const retentionMetrics = useMemo(() => {
        const c = selectedCharlotteKPI;
        const h = selectedHoustonKPI;

        const parseVal = (val) => {
            if (typeof val === 'number') return val;
            if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
            return 0;
        };

        const totalReviews = parseVal(c.reviewsCount) + parseVal(h.reviewsCount);

        const charlotteRow = rawCharlotteData.find(r =>
            r.month?.toLowerCase().includes(selectedMonth.slice(0, 3).toLowerCase()) && r.month?.includes(selectedYear)
        ) || {};

        const houstonRow = rawHoustonData.find(r =>
            r.month?.toLowerCase().includes(selectedMonth.slice(0, 3).toLowerCase()) && r.month?.includes(selectedYear)
        ) || {};

        const moveIns = parseVal(charlotteRow.move_ins || charlotteRow.moveIn) + parseVal(houstonRow.move_ins || houstonRow.moveIn);
        const moveOuts = parseVal(charlotteRow.move_outs || charlotteRow.moveOut) + parseVal(houstonRow.move_outs || houstonRow.moveOut);

        const ratio = moveOuts > 0 ? (moveIns / moveOuts).toFixed(1) : (moveIns > 0 ? moveIns.toFixed(1) : "0.0");

        return {
            totalReviews,
            ratio
        };
    }, [selectedCharlotteKPI, selectedHoustonKPI, rawCharlotteData, rawHoustonData, selectedMonth, selectedYear]);

    /* -------------------- UPDATE -------------------- */

    const updateData = async (newData) => {
        setData(newData);
    };

    const updateDataToSupabase = async () => {
        setIsSaving(true);
        const table =
            tabs === "fund1"
                ? "dashboards"
                : "dashboards_duplicate";

        await supabase
            .from(table)
            .upsert(
                {
                    id: selectedMonth.slice(0, 3) + " " + selectedYear,
                    content: { ...data, hero: { ...data.hero, date: selectedMonth + ' ' + selectedYear } },
                    updated_at: new Date().toISOString()
                },
                { onConflict: "id" }
            );
        setIsSaving(false);
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
                performanceRadarData,
                performanceMetricsData,
                retentionMetrics,
                login,
                logout,
                toggleEditMode,
                isSaving,
                isExporting,
                setIsExporting,
                updateDataToSupabase
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () =>
    useContext(DashboardContext);