import { useState, useRef } from 'react';
import { X, Sparkles, Upload, FileText, Trash2 } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    // Mock submission
    console.log("Creating proposal with files:", files);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003A6E] to-[#001A38] px-8 py-6 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Start New Proposal</h2>
                <p className="text-white/70 text-sm">Let's create an amazing solution for this RFP</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-[#001A38] mb-2">
                Project Name
              </label>
              <input
                type="text"
                placeholder="e.g., Website Redesign"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
              />
            </div>

            {/* Client */}
            <div>
              <label className="block text-sm font-medium text-[#001A38] mb-2">
                Client
              </label>
              <input
                type="text"
                placeholder="e.g., City of Phoenix"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
              />
            </div>

            {/* Due Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#001A38] mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001A38] mb-2">
                  Priority
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>

            {/* RFP Documents Upload */}
            <div>
              <label className="block text-sm font-medium text-[#001A38] mb-2">
                Attachment (RFP Documentation)
              </label>
              <div
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#7C3AED] hover:bg-purple-50/30 transition-all cursor-pointer group relative"
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#3B98C6] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-[#001A38]">Click to upload RFP files</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOCX, or Excel (Max 50MB)</p>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-white rounded-lg border border-gray-200">
                          <FileText className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                          <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(idx)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#001A38] mb-2">
                Description (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Brief description of the proposal..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-[#001A38] mb-3">
                Choose Template
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 rounded-xl border-2 border-[#7C3AED] bg-purple-50 text-left hover:shadow-md transition-all">
                  <h4 className="font-medium text-[#001A38] mb-1">Government RFP</h4>
                  <p className="text-xs text-gray-600">Standard government proposal format</p>
                </button>
                <button className="p-4 rounded-xl border border-gray-200 bg-white text-left hover:border-[#3B98C6] hover:shadow-md transition-all">
                  <h4 className="font-medium text-[#001A38] mb-1">Enterprise</h4>
                  <p className="text-xs text-gray-600">Corporate proposal template</p>
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#a855f7] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all font-medium"
            >
              Create Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
