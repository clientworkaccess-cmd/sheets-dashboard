"use client";

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import EditableText from './EditableText';
import _ from 'lodash';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const PortfolioOverview = () => {
    const { data, updateData } = useDashboard();
    const portfolio = data.portfolio;

    const handleUpdate = (idx, field, value) => {
        const newData = _.cloneDeep(data);
        newData.portfolio[idx][field] = value;
        updateData(newData);
    };

    return (
        <div className="bg-white rounded-3xl p-8 border shadow-sm mb-8 overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-bold text-[#1e293b]">Portfolio Overview</h2>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-gray-100 hover:bg-transparent uppercase tracking-tighter text-[11px]">
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground min-w-[150px]">Fund</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground min-w-[150px]">Property</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Asset Type</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Units</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Market</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Closing Date</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Purchase Price</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Capital Investment</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Loan Amount</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Debt Type</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Interest Rate</TableHead>
                            <TableHead className="px-4 py-3 font-extrabold text-secondary-foreground ">Maturity Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {portfolio.map((row, idx) => (
                            <TableRow key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <TableCell className="px-4 py-4 text-xs font-medium text-gray-700 min-w-50">
                                    <EditableText value={row.fund} onSave={(val) => handleUpdate(idx, 'fund', val)} className='w-full' />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.property} onSave={(val) => handleUpdate(idx, 'property', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.assetType} onSave={(val) => handleUpdate(idx, 'assetType', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.units} onSave={(val) => handleUpdate(idx, 'units', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.market} onSave={(val) => handleUpdate(idx, 'market', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.closingDate} onSave={(val) => handleUpdate(idx, 'closingDate', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.purchasePrice} onSave={(val) => handleUpdate(idx, 'purchasePrice', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.capitalInvestment} onSave={(val) => handleUpdate(idx, 'capitalInvestment', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-400 italic font-medium">
                                    <EditableText value={row.loanAmount} onSave={(val) => handleUpdate(idx, 'loanAmount', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.debtType} onSave={(val) => handleUpdate(idx, 'debtType', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.interestRate} onSave={(val) => handleUpdate(idx, 'interestRate', val)} />
                                </TableCell>
                                <TableCell className="px-4 py-4 text-xs text-gray-600">
                                    <EditableText value={row.maturityDate} onSave={(val) => handleUpdate(idx, 'maturityDate', val)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PortfolioOverview;
