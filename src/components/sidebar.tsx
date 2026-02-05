import { Grid, Sparkles, Folder, FileText, User, Hexagon } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Grid },
    { id: 'research', label: 'Research Agent', icon: Sparkles },
    { id: 'library', label: 'Content Library', icon: Folder },
    { id: 'proposals', label: 'My Proposals', icon: FileText },
  ];

  return (
    <div className="w-[260px] h-screen bg-[#001A38] flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#3B98C6] flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Hexagon className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white text-xl font-semibold tracking-tight">Phoenician</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          const isResearch = item.id === 'research';

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive
                  ? 'bg-[#7C3AED] text-white shadow-lg shadow-purple-500/50'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
                ${isResearch && isActive ? 'ring-2 ring-[#7C3AED] ring-offset-2 ring-offset-[#001A38]' : ''}
              `}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isResearch && isActive ? 'animate-pulse' : 'group-hover:scale-110'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 hover:border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#3B98C6] flex items-center justify-center ring-2 ring-white/10">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Seth Poor</p>
            <p className="text-white/50 text-xs truncate">seth@phoeniciantech.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
