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
    const [researchContext, setResearchContext] = useState<string>('');

    const handleCreateProject = (project: { name: string, files: File[] }) => {
        // In a real app, we would upload these files to the backend here.
        // For now, we'll create a text context from the file names to simulate analysis.
        const context = `Project: ${project.name}\nFiles Uploaded:\n${project.files.map(f => `- ${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join('\n')}`;
        setResearchContext(context);
        setIsNewProjectModalOpen(false);
        setActiveView('research');
    };

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'research':
                return <ResearchAgent initialContext={researchContext} />;
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
                onCreate={handleCreateProject}
            />
        </div>
    );
}
