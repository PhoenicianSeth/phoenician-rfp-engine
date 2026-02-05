import React from 'react';
import { Save, ArrowRight } from 'lucide-react';

export default function RFPInput() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-main">New RFP Project</h2>
                <p className="text-muted">Enter the core details of the Request for Proposal to begin the synthesis process.</p>
            </div>

            <div className="bg-surface rounded-xl border border-border shadow-sm p-8 space-y-8">

                {/* Section 1: Basic Info */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-main border-b border-border pb-2">1. Client Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-main">Client Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 ring-primary/20 outline-none" placeholder="e.g. Acme Corp" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-main">RFP Reference ID</label>
                            <input type="text" className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 ring-primary/20 outline-none" placeholder="e.g. RFP-2026-001" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-main">Due Date</label>
                            <input type="date" className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 ring-primary/20 outline-none" />
                        </div>
                    </div>
                </section>

                {/* Section 2: Context */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-main border-b border-border pb-2">2. Project Context</h3>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-main">Summary & Key Objectives</label>
                        <textarea
                            className="w-full px-3 py-2 border border-border rounded-md text-sm h-32 focus:ring-2 ring-primary/20 outline-none resize-none"
                            placeholder="Paste the executive summary or describe the main goals of this RFP..."
                        ></textarea>
                    </div>
                </section>

                {/* Section 3: Requirements Paste */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-main border-b border-border pb-2">3. Raw Requirements</h3>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-main">RFP Text / Requirements</label>
                        <p className="text-xs text-muted mb-2">Paste the full text of the requirements here. The agent will analyze compliance.</p>
                        <textarea
                            className="w-full px-3 py-2 border border-border rounded-md text-sm h-64 focus:ring-2 ring-primary/20 outline-none font-mono text-xs"
                            placeholder="Paste requirements text..."
                        ></textarea>
                    </div>
                </section>

                <div className="pt-6 flex items-center justify-end gap-4 border-t border-border">
                    <button className="btn bg-white border border-border text-secondary hover:bg-gray-50">
                        <Save size={18} />
                        Save Draft
                    </button>
                    <button className="btn btn-primary">
                        Start Analysis
                        <ArrowRight size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
}
