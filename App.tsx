import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ToolCard from './components/ToolCard';
import FilterBar from './components/FilterBar';
import ServiceFinder from './components/ServiceFinder';
import { AI_TOOLS, HERO_TITLE, HERO_SUBTITLE } from './constants';
import { ToolCategory } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>(ToolCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'service-finder'>('home');

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === ToolCategory.ALL || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-primary/30 font-sans">
      {/* Background Noise */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none z-0"></div>
      
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/20 blur-[130px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="fixed bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      
      <Header />
      
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        
        {currentView === 'home' ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16 space-y-6">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-4">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Curated AI Collection</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-400">
                  {HERO_TITLE}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                {HERO_SUBTITLE}
              </p>
            </div>

            {/* Filters */}
            <FilterBar 
              currentCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Grid - Using 2 columns maximum to ensure wide cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {filteredTools.length > 0 ? (
                filteredTools.map(tool => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    onNavigate={(route) => setCurrentView(route as 'service-finder')}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white/5 rounded-[3rem] border border-white/5 border-dashed">
                  <div className="text-6xl mb-4 grayscale opacity-50">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
                  <p className="text-slate-400">Try adjusting your search or category filter.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(ToolCategory.ALL);
                    }}
                    className="mt-6 px-8 py-2.5 bg-primary text-black hover:bg-primary/90 rounded-full transition-all duration-300 text-sm font-bold shadow-lg shadow-primary/20"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <ServiceFinder onBack={() => setCurrentView('home')} />
        )}

      </main>

      <footer className="relative z-10 border-t border-white/5 py-10 mt-20">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} AI Nexus. Built with 💎 and ☕.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;