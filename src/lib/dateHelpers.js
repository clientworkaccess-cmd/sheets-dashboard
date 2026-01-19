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
