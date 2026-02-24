import React from 'react';
import { LayoutGrid } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <div className="container mx-auto">
        <div className="h-16 flex items-center justify-between glass-panel rounded-full px-6 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-full border border-white/10">
              <LayoutGrid className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              AI Nexus
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all">Home</a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all">About</a>
            <a href="#" className="ml-2 px-5 py-2 text-sm font-bold text-black bg-white hover:bg-slate-200 rounded-full transition-colors">Submit</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;