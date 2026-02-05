import React, { useState } from 'react';
import { Save, Download, History, ChevronLeft, FileText } from 'lucide-react';
import { generateProposalPDF } from '../lib/pdf-generator';

export default function ProposalEditor({ onBack }: { onBack: () => void }) {
    const [content, setContent] = useState(`
# Executive Summary

We are pleased to submit this proposal to the City of Phoenix for the Smart Lighting Initiative. Our solution, **LuminaSmart**, offers a 40% reduction in energy costs...

## Understanding Requirements

We have reviewed RFP-2026-001 and confirmed compliance with all major requirements, including:
- SOC 2 Type II Security
- 99.99% Uptime SLA
- Local Data Residency

## Proposed Solution

Our architecture is built on a modular, cloud-native stack...
  `.trim());

    const [isExporting, setIsExporting] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        await generateProposalPDF(
            content,
            { client: 'City of Phoenix', title: 'Smart Lighting Proposal' },
            { primaryColor: '#4F46E5', showLogo: true }
        );
        setIsExporting(false);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Toolkit Header */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-muted hover:text-main flex items-center gap-1 text-sm font-medium">
                        <ChevronLeft size={16} /> Back
                    </button>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <div>
                        <h2 className="text-lg font-bold text-main">Smart Lighting Proposal</h2>
                        <span className="text-xs text-muted">Last edited 2 mins ago</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className={`btn border border-border text-secondary hover:bg-gray-50 ${showHistory ? 'bg-gray-100' : ''}`}
                    >
                        <History size={16} />
                        History
                    </button>
                    <button className="btn border border-border text-secondary hover:bg-gray-50">
                        <Save size={16} />
                        Save
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="btn btn-primary"
                    >
                        {isExporting ? 'Exporting...' : (
                            <>
                                <Download size={16} />
                                Export PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Main Editor */}
                <div className="flex-1 bg-surface rounded-xl border border-border shadow-sm flex flex-col">
                    <div className="border-b border-border p-2 flex gap-2 bg-gray-50 rounded-t-xl">
                        {/* Mock Formatting Toolbar */}
                        <ToolbarButton label="B" bold />
                        <ToolbarButton label="I" italic />
                        <ToolbarButton label="H1" />
                        <ToolbarButton label="H2" />
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                        <ToolbarButton label="List" />
                        <ToolbarButton label="Link" />
                    </div>
                    <textarea
                        className="flex-1 p-8 outline-none resize-none font-sans text-lg leading-relaxed text-main"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                {/* Sidebar (History / Assets) */}
                {showHistory && (
                    <div className="w-80 bg-surface rounded-xl border border-border shadow-sm flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
                        <div className="p-4 border-b border-border font-semibold text-sm">Version History</div>
                        <div className="overflow-y-auto flex-1 p-2 space-y-2">
                            <HistoryItem time="Just now" author="You" action="Current Draft" active />
                            <HistoryItem time="2 hours ago" author="Jane Doe" action="Added Compliance Matrix" />
                            <HistoryItem time="Yesterday" author="System" action="Initial Generation" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ToolbarButton({ label, bold, italic }: any) {
    return (
        <button className={`w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center text-sm font-medium text-secondary ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''}`}>
            {label}
        </button>
    )
}

function HistoryItem({ time, author, action, active }: any) {
    return (
        <div className={`p-3 rounded-lg border ${active ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-100 hover:border-gray-300'} transition-all cursor-pointer`}>
            <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-semibold text-main">{author}</span>
                <span className="text-[10px] text-muted">{time}</span>
            </div>
            <p className="text-xs text-secondary">{action}</p>
        </div>
    )
}
