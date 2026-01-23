/**
 * Date helper functions for dashboard filtering
 * These helpers work across year boundaries and handle missing months gracefully
 */

/**
 * Find the index of a row matching the selected month and year
 * @param {Array} data - Array of data objects with 'name' field (e.g., "Nov'25")
 * @param {string} selectedMonth - Full month name (e.g., "November")
 * @param {string} selectedYear - Full year (e.g., "2025")
 * @returns {number} Index of matching row, or -1 if not found
 */
export const findIndexByMonthYear = (data, selectedMonth, selectedYear) => {
    if (!data?.length || !selectedMonth || !selectedYear) return -1;

    // Convert "November" -> "Nov", "2025" -> "25"
    const monthAbbr = selectedMonth.slice(0, 3);
    const yearAbbr = selectedYear.slice(-2);

    return data.findIndex(row => {
        const name = row.name || row.month || '';
        return name.toLowerCase().includes(monthAbbr.toLowerCase()) && name.includes(yearAbbr);
    });
};
export const getMonthAfterThreeMonths = (selectedMonth, selectedYear) => {
    if (!selectedMonth || !selectedYear) return null;

    const monthMap = {
        january: 0, february: 1, march: 2, april: 3,
        may: 4, june: 5, july: 6, august: 7,
        september: 8, october: 9, november: 10, december: 11
    };

    const monthIndex = monthMap[selectedMonth.toLowerCase()];
    if (monthIndex === undefined) return null;

    const date = new Date(Number(selectedYear), monthIndex);
    date.setMonth(date.getMonth() + 3);

    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${monthName} ${year}`;
};
/**
 * Get up to 6 months of data ending at the selected month
 * Returns selected month + previous 5 months (or fewer if at start of data)
 * @param {Array} data - Array of data objects with 'name' or 'month' field
 * @param {string} selectedMonth - Full month name
 * @param {string} selectedYear - Full year
 * @returns {Array} Array of 1-6 data objects in chronological order
 */
export const getLastSixMonths = (data, selectedMonth, selectedYear) => {
    const idx = findIndexByMonthYear(data, selectedMonth, selectedYear);

    if (idx === -1) {
        // If selected month not found, return last 6 months of available data
        return data.slice(-6);
    }

    // Get up to 6 months: from (idx - 5) to (idx), inclusive
    const startIdx = Math.max(0, idx - 5);
    return data.slice(startIdx, idx + 1);
};
export const getLastTewelveMonths = (data, selectedMonth, selectedYear) => {
    const idx = findIndexByMonthYear(data, selectedMonth, selectedYear);

    if (idx === -1) {
        // If selected month not found, return last 12 months of available data
        return data.slice(-12);
    }

    // Get up to 12 months: from (idx - 11) to (idx), inclusive
    const startIdx = Math.max(0, idx - 11);
    return data.slice(startIdx, idx + 1);
};

/**
 * Get up to 24 months of data ending at the selected month
 * @param {Array} data - Array of data objects
 * @param {string} selectedMonth - Full month name
 * @param {string} selectedYear - Full year
 * @returns {Array} Array of 1-24 data objects in chronological order
 */
export const getLast24Months = (data, selectedMonth, selectedYear) => {
    const idx = findIndexByMonthYear(data, selectedMonth, selectedYear);

    if (idx === -1) {
        return data.slice(-24);
    }

    const startIdx = Math.max(0, idx - 23);
    return data.slice(startIdx, idx + 1);
};

export const getLast27Months = (data, selectedMonth, selectedYear) => {
    if (!data?.length) return [];

    const targetMonthYear = getMonthAfterThreeMonths(selectedMonth, selectedYear);
    if (!targetMonthYear) return data.slice(-27);

    // Find index of target month+year in data
    const idx = data.findIndex(row => {
        const name = row.name || row.month || '';
        return name.toLowerCase() === targetMonthYear.toLowerCase();
    });

    if (idx === -1) return data.slice(-27);

    const startIdx = Math.max(0, idx - 26); // last 27 months including target
    return data.slice(startIdx, idx + 1);
};

/**
 * Get the data row for the selected month only
 * @param {Array} data - Array of data objects with 'name' field
 * @param {string} selectedMonth - Full month name
 * @param {string} selectedYear - Full year
 * @returns {Object|null} The matching data row, or null if not found
 */
export const getSelectedMonthRow = (data, selectedMonth, selectedYear) => {
    const idx = findIndexByMonthYear(data, selectedMonth, selectedYear);
    return idx !== -1 ? data[idx] : null;
};

/**
 * Get raw Supabase row for selected month (includes all fields like units, rent_per_sq_ft)
 * @param {Array} rawData - Raw Supabase data array
 * @param {string} selectedMonth - Full month name
 * @param {string} selectedYear - Full year
 * @returns {Object|null} The matching raw data row, or null if not found
 */
export const getSelectedMonthRaw = (rawData, selectedMonth, selectedYear) => {
    if (!rawData?.length || !selectedMonth || !selectedYear) return null;

    const monthAbbr = selectedMonth.slice(0, 3);
    const yearAbbr = selectedYear.slice(-2);

    return rawData.find(row => {
        const month = row.month || '';
        return month.includes(monthAbbr) && month.includes(yearAbbr);
    }) || null;
};
