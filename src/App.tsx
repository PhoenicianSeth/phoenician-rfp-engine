import { useState } from 'react';
import { Sidebar } from './components/sidebar';
import { Dashboard } from './components/dashboard';
import { ResearchAgent } from './components/research-agent';
import { ContentLibrary } from './components/content-library';
import { ProposalEditor } from './components/proposal-editor';
import { NewProjectModal } from './components/new-project-modal';
import { Plus } from 'lucide-react';

type View = 'dashboard' | 'research' | 'library' | 'proposals';

export default function App() {
    const [activeView, setActiveView] = useState<View>('dashboard');
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'research':
                return <ResearchAgent />;
            case 'library':
                return <ContentLibrary />;
            case 'proposals':
                return <ProposalEditor />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
            <Sidebar activeView={activeView} onNavigate={(view) => setActiveView(view as View)} />

            {renderView()}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsNewProjectModalOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#a855f7] text-white rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 cursor-pointer"
                title="New Proposal"
            >
                <Plus className="w-8 h-8" />
            </button>

            {/* New Project Modal */}
            <NewProjectModal
                isOpen={isNewProjectModalOpen}
                onClose={() => setIsNewProjectModalOpen(false)}
            />
        </div>
    );
}
