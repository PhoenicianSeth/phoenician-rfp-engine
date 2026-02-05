import React from 'react';
import { MoreHorizontal, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const STAGES = [
    { id: 'draft', label: 'Draft', color: 'border-l-4 border-gray-400' },
    { id: 'review', label: 'Internal Review', color: 'border-l-4 border-indigo-400' },
    { id: 'submitted', label: 'Submitted', color: 'border-l-4 border-blue-400' },
    { id: 'presentation', label: 'Presentation', color: 'border-l-4 border-purple-400' },
    { id: 'negotiation', label: 'Negotiation', color: 'border-l-4 border-pink-400' },
    { id: 'won', label: 'Won', color: 'border-l-4 border-green-500' },
    { id: 'lost', label: 'Lost', color: 'border-l-4 border-red-500' },
];

const MOCK_PROPOSALS = [
    { id: 1, title: 'City of Phoenix - Smart Lighting', client: 'City of Phoenix', value: '$1.2M', due: '2 days left', stage: 'draft' },
    { id: 2, title: 'Acme Corp ERP Upgrade', client: 'Acme Corp', value: '$450k', due: 'Submitted', stage: 'submitted' },
    { id: 3, title: 'Department of Transit - Fleet AI', client: 'DoT', value: '$2.5M', due: 'Demo Scheduled', stage: 'presentation' },
    { id: 4, title: 'SecureCloud Hosting', client: 'FinTech Global', value: '$850k', due: 'Contracting', stage: 'negotiation' },
    { id: 5, title: 'Unified Comms Renewal', client: 'BigBank', value: '$120k', due: 'Signed', stage: 'won' },
];

export default function ProposalDashboard({ onOpenProposal }: { onOpenProposal: () => void }) {
    return (
        <div className="h-full flex flex-col">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-main">Proprietary Pipeline</h2>
                <button className="btn btn-primary" onClick={onOpenProposal}>
                    + New Proposal
                </button>
            </div>

            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-4 h-full min-w-max pb-4">
                    {STAGES.map((stage) => {
                        const items = MOCK_PROPOSALS.filter(p => p.stage === stage.id);

                        return (
                            <div key={stage.id} className="w-72 flex flex-col bg-gray-100/50 rounded-xl border border-gray-200/60 max-h-full">
                                {/* Column Header */}
                                <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-gray-50/50 rounded-t-xl">
                                    <span className="font-semibold text-sm text-secondary uppercase tracking-wider">{stage.label}</span>
                                    <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded-full text-muted">
                                        {items.length}
                                    </span>
                                </div>

                                {/* Column Content */}
                                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={onOpenProposal}
                                            className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer ${stage.color}`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-bold text-primary px-2 py-1 bg-indigo-50 rounded-md">
                                                    {item.value}
                                                </span>
                                                <button className="text-muted hover:text-main">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </div>
                                            <h4 className="font-semibold text-main text-sm leading-tight mb-1">{item.title}</h4>
                                            <p className="text-xs text-muted mb-3">{item.client}</p>

                                            <div className="flex items-center gap-2 text-xs text-secondary bg-gray-50 p-2 rounded-md">
                                                <Clock size={12} />
                                                {item.due}
                                            </div>
                                        </div>
                                    ))}

                                    {items.length === 0 && (
                                        <div className="h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-xs text-muted">
                                            No items
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
