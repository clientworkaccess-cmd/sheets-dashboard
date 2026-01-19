// Helper function to convert array/object data to HTML for EditorJS
export function convertToEditorHTML(data) {
    if (!data) return '';

    // If already a string (HTML), return as is
    if (typeof data === 'string') {
        return data;
    }

    // If array of strings
    if (Array.isArray(data) && typeof data[0] === 'string') {
        return '<ul>' + data.map(item => `<li>${item}</li>`).join('') + '</ul>';
    }

    // If array of objects with text property (checklist format)
    if (Array.isArray(data) && data[0]?.text) {
        return '<ul>' + data.map(item => `<li>${item.text}</li>`).join('') + '</ul>';
    }

    // If array of any other objects, try to stringify
    if (Array.isArray(data)) {
        return '<ul>' + data.map(item => `<li>${JSON.stringify(item)}</li>`).join('') + '</ul>';
    }

    return String(data);
}

// Helper function to convert HTML back to array format for saving
export function convertFromEditorHTML(html) {
    if (!html) return [];

    // If already an array, return as is
    if (Array.isArray(html)) {
        return html;
    }

    // Return HTML string directly - it will be stored as HTML now
    return html;
}
