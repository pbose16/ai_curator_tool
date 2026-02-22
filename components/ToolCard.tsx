import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { AiTool } from '../types';

interface ToolCardProps {
  tool: AiTool;
  onNavigate?: (route: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onNavigate }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (tool.internalRoute && onNavigate) {
      e.preventDefault();
      onNavigate(tool.internalRoute);
    }
  };

  return (
    <a 
      href={tool.url}
      target={tool.internalRoute ? undefined : "_blank"}
      rel={tool.internalRoute ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 rounded-[2.5rem] bg-[#0f172a] border border-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] hover:bg-white/[0.02] overflow-hidden cursor-pointer"
    >
      {/* Background Hover Glow */}
      <div className="absolute -left-10 top-0 w-32 h-full bg-gradient-to-r from-primary/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Icon Section */}
      <div className="shrink-0 relative z-10">
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#1e293b] text-3xl shadow-inner border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          {tool.icon}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors truncate">
            {tool.name}
          </h3>
          {tool.popular && (
            <span className="shrink-0 flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black bg-secondary rounded-full shadow-[0_0_10px_rgba(251,113,133,0.4)]">
              <Zap className="w-3 h-3 fill-black" />
              Hot
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 pr-4">
          {tool.description}
        </p>
      </div>

      {/* Action Section */}
      <div className="relative z-10 w-full sm:w-auto mt-4 sm:mt-0 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:pl-6 sm:border-l border-white/5 self-stretch">
        <span className="order-1 sm:order-2 inline-block px-3 py-1 text-xs font-semibold text-primary/80 bg-primary/10 rounded-full border border-primary/10">
          {tool.category}
        </span>
        
        <div className="order-2 sm:order-1 p-2.5 rounded-full bg-white/5 text-slate-400 group-hover:bg-primary group-hover:text-black transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </a>
  );
};

export default ToolCard;