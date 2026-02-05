import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Plus, FileText } from 'lucide-react';

interface Requirement {
    id: number;
    section: string;
    text: string;
    status: 'compliant' | 'partial' | 'non-compliant' | 'unknown';
    notes: string;
}

const MOCK_REQUIREMENTS: Requirement[] = [
    { id: 1, section: '4.1', text: 'Vendor must hold SOC 2 Type II certification.', status: 'compliant', notes: 'Certificate available in library.' },
    { id: 2, section: '4.2', text: 'System uptime must exceed 99.99% annually.', status: 'partial', notes: 'We guarantee 99.9%. Need approval for exception.' },
    { id: 3, section: '5.0', text: 'Support must be US-based only.', status: 'compliant', notes: '' },
    { id: 4, section: '6.3', text: 'Mobile app must support offline mode.', status: 'unknown', notes: 'Requires engineering review.' },
];

export default function ComplianceMatrix() {
    const [requirements, setRequirements] = useState<Requirement[]>(MOCK_REQUIREMENTS);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'compliant': return 'bg-green-100 text-green-700 border-green-200';
            case 'partial': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'non-compliant': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'compliant': return <CheckCircle size={14} />;
            case 'partial': return <AlertTriangle size={14} />;
            case 'non-compliant': return <XCircle size={14} />;
            default: return <FileText size={14} />;
        }
    };

    return (
        <div className="h-full flex flex-col max-w-6xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-main">Compliance Matrix</h2>
                    <p className="text-muted">Track requirements compliance (Shred Status: 4/24 items pending)</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn border border-border text-secondary hover:bg-gray-50">
                        Export CSV
                    </button>
                    <button className="btn btn-primary">
                        <Plus size={16} />
                        Add Requirement
                    </button>
                </div>
            </div>

            <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-border text-xs uppercase text-muted font-semibold">
                            <tr>
                                <th className="px-6 py-4 w-24">Section</th>
                                <th className="px-6 py-4">Requirement Text</th>
                                <th className="px-6 py-4 w-48">Status</th>
                                <th className="px-6 py-4 w-64">Notes / Assignment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {requirements.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-secondary">{req.section}</td>
                                    <td className="px-6 py-4 text-main font-medium">{req.text}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.status)} uppercase tracking-wide`}>
                                            {getStatusIcon(req.status)}
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted truncate max-w-xs">{req.notes || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State / Loader Placeholder */}
                {requirements.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted p-12">
                        <FileText size={48} className="mb-4 opacity-20" />
                        <p>No requirements loaded. Import from RFP Input.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
