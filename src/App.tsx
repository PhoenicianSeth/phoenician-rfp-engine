import { useState } from 'react';
import { Sidebar } from './components/sidebar';
import { Dashboard } from './components/dashboard';
import { ResearchAgent } from './components/research-agent';
import { ContentLibrary } from './components/content-library';
import { ProposalEditor } from './components/proposal-editor';
import { NewProjectModal } from './components/new-project-modal';
import { Plus } from 'lucide-react';

type View = 'dashboard' | 'research' | 'library' | 'proposals';

import type { UploadedFile } from './components/new-project-modal';
import type { FilePart } from './lib/ai-service';

// ...

export default function App() {
    const [activeView, setActiveView] = useState<View>('dashboard');
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
    const [researchContext, setResearchContext] = useState<string>('');
    const [fileParts, setFileParts] = useState<FilePart[]>([]);

    const handleCreateProject = async (project: { name: string, files: UploadedFile[] }) => {
        let libraryContext = '';
        let libraryParts: FilePart[] = [];

        try {
            // Fetch ALL files from Content Library
            const res = await fetch('http://127.0.0.1:3001/api/files');
            if (res.ok) {
                const allFiles = await res.json();

                const assetFiles = allFiles.filter((f: any) => f.category === 'assets');
                const historicalFiles = allFiles.filter((f: any) => f.category === 'historical');

                // Build detailed context instructions
                if (assetFiles.length > 0) {
                    libraryContext += `\n\n[PHOENICIAN ASSETS]\nUse these documents as the SOURCE OF TRUTH for company capabilities, standard descriptions, and technical specifications:\n${assetFiles.map((f: any) => `- ${f.name}`).join('\n')}`;
                }

                if (historicalFiles.length > 0) {
                    libraryContext += `\n\n[HISTORICAL PROPOSALS]\nUse these documents purely for TONE, STYLE, and FORMATTING reference. Do not copy their specific project details, but emulate their persuasive voice:\n${historicalFiles.map((f: any) => `- ${f.name}`).join('\n')}`;
                }

                // Combine all files for the AI to "read"
                libraryParts = [...assetFiles, ...historicalFiles].map((f: any) => ({
                    mimeType: f.type || 'application/pdf',
                    gcsUri: f.gcsUri
                }));
            }
        } catch (error) {
            console.error("Failed to fetch library assets:", error);
        }

        // Create context string
        const context = `CURRENT PROJECT: ${project.name}\n\n[NEW RFP DOCUMENTS]\nAnalyze these files to understand the specific requirements for this proposal:\n${project.files.map(f => `- ${f.name}`).join('\n')}${libraryContext}`;
        setResearchContext(context);

        // Map Project Files to FileParts
        const projectParts: FilePart[] = project.files.map(f => ({
            mimeType: f.mimeType,
            gcsUri: f.gcsUri
        }));

        // Combine Project Files + Library Assets
        setFileParts([...projectParts, ...libraryParts]);

        setIsNewProjectModalOpen(false);
        setActiveView('research');
    };

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'research':
                return <ResearchAgent initialContext={researchContext} fileParts={fileParts} />;
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
