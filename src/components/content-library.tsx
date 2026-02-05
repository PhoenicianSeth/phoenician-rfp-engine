import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, Clock, Search, Filter, Building2, History, FileCheck, Trash2, MoreVertical, Edit2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Document {
  id: string;
  name: string;
  type: string;
  category: 'historical' | 'assets';
  status: 'ready' | 'processing' | 'pending';
  uploadedDate: string;
  size: string;
  previewUrl?: string;
}

type CategoryFilter = 'all' | 'historical' | 'assets';

export function ContentLibrary() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const newDocs: Document[] = Array.from(files).map((file) => {
      const isImage = file.type.startsWith('image/');
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
        category: 'assets', // Default category changed to assets since RFP is removed
        status: 'processing', // Initial status
        uploadedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        previewUrl: isImage ? URL.createObjectURL(file) : undefined,
      };
    });

    setDocuments((prev) => [...newDocs, ...prev]);

    // Simulate upload completion
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) =>
          newDocs.some((d) => d.id === doc.id)
            ? { ...doc, status: 'ready' }
            : doc
        )
      );
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  }

  const handleCategoryUpdate = (id: string, newCategory: 'historical' | 'assets') => {
    setDocuments(prev => prev.map(doc =>
      doc.id === id ? { ...doc, category: newCategory } : doc
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'processing':
        return <Clock className="w-3 h-3 animate-spin" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {

      case 'historical':
        return <History className="w-4 h-4" />;
      case 'assets':
        return <FileCheck className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {

      case 'historical':
        return 'bg-purple-100 text-purple-700';
      case 'assets':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {

      case 'historical':
        return 'Historical Proposal';
      case 'assets':
        return 'Phoenician Asset';
      default:
        return category;
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    if (activeCategory === 'all') return true;
    return doc.category === activeCategory;
  });

  return (
    <div className="flex-1 ml-[260px] min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        multiple
      />
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#001A38] mb-1">Content Library</h1>
              <p className="text-sm text-gray-500">Manage your RFP documents and reference materials</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-[300px] pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
                />
              </div>
              <button className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Upload Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            mb-8 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer
            ${dragActive
              ? 'border-[#7C3AED] bg-purple-50'
              : 'border-gray-300 bg-white hover:border-[#3B98C6] hover:bg-blue-50/30'
            }
          `}
        >
          <div className="p-12 text-center pointer-events-none">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#3B98C6] to-[#0EA5E9] flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#001A38] mb-2">Drop reference docs here</h3>
            <p className="text-gray-500 mb-4">or click to browse from your computer</p>
            <button className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#a855f7] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all font-medium pointer-events-auto" onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}>
              Choose Files
            </button>
            <p className="text-xs text-gray-400 mt-4">Supports PDF, DOC, DOCX up to 50MB</p>
          </div>
        </div>

        {/* Document Grid */}
        <div>
          {/* Category Filter Tabs */}
          {documents.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#a855f7] text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#7C3AED] hover:text-[#7C3AED]'
                  }`}
              >
                All Documents <span className="ml-1.5 opacity-75">({documents.length})</span>
              </button>



              <button
                onClick={() => setActiveCategory('historical')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${activeCategory === 'historical'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#a855f7] text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#7C3AED] hover:text-[#7C3AED]'
                  }`}
              >
                <History className="w-4 h-4" />
                Historical Proposals <span className="ml-1.5 opacity-75">({documents.filter(d => d.category === 'historical').length})</span>
              </button>

              <button
                onClick={() => setActiveCategory('assets')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${activeCategory === 'assets'
                  ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#10b981] hover:text-[#10b981]'
                  }`}
              >
                <FileCheck className="w-4 h-4" />
                Phoenician Assets <span className="ml-1.5 opacity-75">({documents.filter(d => d.category === 'assets').length})</span>
              </button>
            </div>
          )}

          {documents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No documents yet</h3>
              <p className="text-gray-500">Upload documents to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-pointer group relative"
                >
                  <button
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* File Icon */}
                  {/* File Icon or Preview */}
                  <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden relative">
                    {doc.previewUrl ? (
                      <img src={doc.previewUrl} alt={doc.name} className="w-full h-full object-scale-down" />
                    ) : (
                      <FileText className="w-8 h-8 text-[#003A6E]" />
                    )}
                  </div>

                  {/* File Name */}
                  <h3 className="font-medium text-[#001A38] mb-2 line-clamp-2 min-h-[3rem]">
                    {doc.name}
                  </h3>

                  {/* Category Badge - Clickable for Reclassification */}
                  <div className="mb-3" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none outline-none">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer hover:ring-2 hover:ring-offset-1 transition-all outline-none ${getCategoryColor(
                            doc.category
                          )}`}
                        >
                          {getCategoryIcon(doc.category)}
                          {getCategoryLabel(doc.category)}
                          <Edit2 className="w-3 h-3 ml-1 opacity-50" />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Move to Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => handleCategoryUpdate(doc.id, 'historical')}>
                          <History className="w-4 h-4 mr-2" /> Historical Proposal
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCategoryUpdate(doc.id, 'assets')}>
                          <FileCheck className="w-4 h-4 mr-2" /> Phoenician Asset
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{doc.uploadedDate}</span>
                    <span>{doc.size}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                        doc.status
                      )}`}
                    >
                      {getStatusIcon(doc.status)}
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}