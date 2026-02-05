import React, { useState } from 'react';
import { Upload, FileText, Trash2, File, CheckCircle } from 'lucide-react';

export default function ContentLibrary() {
    const [files, setFiles] = useState([
        { id: 1, name: 'Company_Profile_2025.pdf', size: '2.4 MB', status: 'ready', type: 'pdf' },
        { id: 2, name: 'Security_Compliance_Soc2.docx', size: '1.1 MB', status: 'ready', type: 'doc' },
        { id: 3, name: 'Case_Study_Fintech.pdf', size: '3.5 MB', status: 'processing', type: 'pdf' },
    ]);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-main">Content Library</h2>
                    <p className="text-muted">Manage your reference documents and past proposals.</p>
                </div>
                <button className="btn btn-primary">
                    <Upload size={18} />
                    Upload New
                </button>
            </div>

            {/* Upload Zone */}
            <div className="mb-10 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary/50 hover:bg-gray-50 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                </div>
                <h3 className="text-lg font-medium text-main mb-1">Upload Reference Material</h3>
                <p className="text-muted text-sm max-w-md mx-auto">
                    Drag and drop your PDF, Word, or Text files here to add them to the knowledge base.
                    <br /><span className="text-xs mt-2 block">Max file size 25MB.</span>
                </p>
            </div>

            {/* File List */}
            <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold text-main">Uploaded Documents ({files.length})</h3>
                    <div className="flex gap-2">
                        {/* Filter placeholders */}
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {files.map((file) => (
                        <div key={file.id} className="p-4 flex items-center hover:bg-gray-50 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-primary flex items-center justify-center mr-4">
                                <FileText size={20} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-main truncate">{file.name}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-muted">{file.size}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                                        {file.status === 'ready' && <CheckCircle size={10} />}
                                        {file.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-muted hover:text-red-600 rounded-md hover:bg-red-50">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
