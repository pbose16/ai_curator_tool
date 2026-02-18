import React from 'react';
import { Search, Sparkles, Briefcase, Layers } from 'lucide-react';
import { ToolCategory } from '../types';

interface FilterBarProps {
  currentCategory: ToolCategory;
  onCategoryChange: (category: ToolCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  currentCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange 
}) => {

  const aiToolsCategories = [
    ToolCategory.CHATBOT,
    ToolCategory.IMAGE,
    ToolCategory.VIDEO,
    ToolCategory.AUDIO,
  ];

  const projectToolsCategories = [
    ToolCategory.CODING,
    ToolCategory.PRODUCTIVITY,
    ToolCategory.WRITING,
  ];

  const CategoryButton = ({ category, isActive }: { category: ToolCategory, isActive: boolean }) => (
    <button
      onClick={() => onCategoryChange(category)}
      className={`
        px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border
        ${isActive 
          ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] transform scale-105' 
          : 'bg-[#0f172a]/80 border-white/5 text-slate-400 hover:border-white/20 hover:text-white hover:bg-white/10'
        }
      `}
    >
      {category}
    </button>
  );

  return (
    <div className="flex flex-col gap-10 mb-16 max-w-5xl mx-auto">
      {/* Search Input */}
      <div className="relative w-full max-w-xl mx-auto group z-20">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-6 py-4 bg-[#0f172a] border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-xl"
            placeholder="Search for tools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Container */}
      <div className="flex flex-col gap-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Global Filter */}
        <div className="flex justify-center mb-2">
          <button
            onClick={() => onCategoryChange(ToolCategory.ALL)}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
              ${currentCategory === ToolCategory.ALL
                ? 'bg-gradient-to-r from-primary to-secondary border-transparent text-black shadow-lg shadow-primary/20 scale-105' 
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }
            `}
          >
            <Layers className="w-4 h-4" />
            View All Tools
          </button>
        </div>

        <div className="w-full h-px bg-white/5"></div>

        <div className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-8 items-center">
          {/* Section 1: AI Tools */}
          <div className="flex items-center gap-2 text-primary/80 md:justify-end">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest text-right">The AI Tools</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiToolsCategories.map((category) => (
              <CategoryButton 
                key={category} 
                category={category} 
                isActive={currentCategory === category} 
              />
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/5 md:hidden"></div>

        <div className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-8 items-center">
          {/* Section 2: Ongoing Project Tools */}
          <div className="flex items-center gap-2 text-secondary/80 md:justify-end">
            <Briefcase className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest text-right">Ongoing Projects</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {projectToolsCategories.map((category) => (
              <CategoryButton 
                key={category} 
                category={category} 
                isActive={currentCategory === category} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;