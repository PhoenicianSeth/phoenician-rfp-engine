import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  ChevronRight,
  Clock,
  Download,
  Share2
} from 'lucide-react';

interface Version {
  id: number;
  name: string;
  date: string;
  time: string;
}

const versions: Version[] = [
  { id: 1, name: 'Current Draft', date: 'Feb 4, 2026', time: '2:30 PM' },
  { id: 2, name: 'Version 2.1', date: 'Feb 3, 2026', time: '4:15 PM' },
  { id: 3, name: 'Version 2.0', date: 'Feb 2, 2026', time: '11:20 AM' },
  { id: 4, name: 'Version 1.5', date: 'Feb 1, 2026', time: '3:45 PM' },
];

export function ProposalEditor() {
  const [versionsPanelOpen, setVersionsPanelOpen] = useState(true);

  return (
    <div className="flex-1 ml-[260px] min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex">
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-[#001A38] mb-1">
                  City of Phoenix - Transportation Services Proposal
                </h1>
                <p className="text-sm text-gray-500">Last edited 5 minutes ago</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-[#7C3AED] to-[#a855f7] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
              </div>
            </div>

            {/* Formatting Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-gray-50 rounded-xl">
              <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#003A6E]">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#003A6E]">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#003A6E]">
                <Underline className="w-4 h-4" />
              </button>

              <div className="w-px h-6 bg-gray-300 mx-2"></div>

              <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#003A6E]">
                <AlignLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#003A6E]">
                <AlignCenter className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#003A6E]">
                <AlignRight className="w-4 h-4" />
              </button>

              <div className="w-px h-6 bg-gray-300 mx-2"></div>

              <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#003A6E]">
                <List className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#003A6E]">
                <ListOrdered className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Editor Canvas */}
        <div className="flex-1 overflow-y-auto py-12 px-8">
          <div className="max-w-4xl mx-auto">
            {/* Paper-like Container */}
            <div className="bg-white rounded-2xl shadow-2xl shadow-gray-300/30 border border-gray-200 aspect-[8.5/11] p-16">
              <div className="prose prose-lg max-w-none">
                <h1 className="text-3xl font-semibold text-[#001A38] mb-6">
                  Executive Summary
                </h1>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Phoenician Solutions is pleased to submit this comprehensive proposal in response to the City of Phoenix's Request for Proposal for Transportation Services. Our team brings over 15 years of experience in managing and optimizing municipal transit systems across the Southwest region.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  This proposal outlines our innovative approach to modernizing Phoenix's transportation infrastructure while maintaining full compliance with all DBE requirements, environmental standards, and technical specifications detailed in the RFP.
                </p>

                <h2 className="text-2xl font-semibold text-[#001A38] mb-4 mt-8">
                  Understanding Your Requirements
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                  We have thoroughly analyzed the RFP requirements and have identified the following key priorities:
                </p>

                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Implementation of electric and hybrid vehicle fleet integration</li>
                  <li>Achievement of 18% DBE participation minimum</li>
                  <li>Delivery of comprehensive driver training programs</li>
                  <li>Integration with existing city infrastructure and systems</li>
                  <li>Compliance with all safety and insurance requirements</li>
                </ul>

                <h2 className="text-2xl font-semibold text-[#001A38] mb-4 mt-8">
                  Our Approach
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Our proposed solution leverages cutting-edge technology and proven methodologies to deliver a transportation system that exceeds expectations. We will implement a phased approach that ensures minimal disruption to existing services while achieving maximum efficiency gains.
                </p>

                <div className="bg-blue-50 border-l-4 border-[#3B98C6] p-6 rounded-r-xl my-6">
                  <p className="text-sm text-gray-600 italic">
                    "Our commitment is to deliver not just a transportation system, but a sustainable, future-ready solution that serves the Phoenix community for decades to come."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version History Sidebar */}
      <div
        className={`border-l border-gray-200 bg-white transition-all duration-300 ${
          versionsPanelOpen ? 'w-[320px]' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-[#001A38]">Version History</h3>
            <button
              onClick={() => setVersionsPanelOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-3">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  index === 0
                    ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-[#7C3AED] shadow-md'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-[#001A38] text-sm">{version.name}</h4>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-[#7C3AED] text-white text-xs rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{version.date}</span>
                  <span>•</span>
                  <span>{version.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Version Panel Button (when closed) */}
      {!versionsPanelOpen && (
        <button
          onClick={() => setVersionsPanelOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 p-3 bg-white border border-gray-200 rounded-l-xl shadow-lg hover:shadow-xl transition-all"
        >
          <ChevronRight className="w-5 h-5 text-gray-500 rotate-180" />
        </button>
      )}
    </div>
  );
}
