"use client";

import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import download from 'downloadjs';

export const handleExport = async (format) => {
    const element = document.getElementById('dashboard-content');
    if (!element) return;

    // Temporarily remove rounded corners and shadows for a "clean" edge-to-edge export if needed
    // but the user said "Exact visual match of dashboard content only"

    try {
        if (format === 'PNG') {
            const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 2 });
            download(dataUrl, 'dashboard-export.png');
        } else if (format === 'JPEG') {
            const dataUrl = await toJpeg(element, { quality: 0.95, pixelRatio: 2 });
            download(dataUrl, 'dashboard-export.jpg');
        } else if (format === 'PDF') {
            const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 2 });
            const pdf = new jsPDF('p', 'px', [element.offsetWidth, element.offsetHeight]);
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('dashboard-export.pdf');
        }
        return true;
    } catch (error) {
        console.error('Export failed:', error);
        throw error;
    }
};
