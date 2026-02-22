import React, { useState } from 'react';
import { Search, MapPin, Navigation, Star, ArrowLeft } from 'lucide-react';
import LocationPickerModal from './LocationPickerModal';

interface ServiceResult {
  id: string;
  name: string;
  category: string;
  location: string;
  distance: number;
  rating: number;
  description: string;
}

interface ServiceFinderProps {
  onBack: () => void;
}

const ServiceFinder: React.FC<ServiceFinderProps> = ({ onBack }) => {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(10);
  const [results, setResults] = useState<ServiceResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: ServiceResult[] = Array.from({ length: 5 }).map((_, i) => ({
        id: `service-${i}`,
        name: `${service || 'General'} Service ${i + 1}`,
        category: service || 'General',
        location: location || 'Nearby',
        distance: Math.round(Math.random() * radius * 10) / 10,
        rating: 4 + Math.random(),
        description: `Professional ${service || 'service'} provider with years of experience.`
      })).sort((a, b) => a.distance - b.distance);
      
      setResults(mockResults);
      setHasSearched(true);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </button>

      <div className="bg-[#0f172a]/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Service Finder</h2>
        <p className="text-slate-400 mb-8">Find the best local professionals for your needs.</p>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Service Type</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="e.g. Plumber, Electrician"
                  className="w-full bg-[#1e293b] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onClick={() => setIsMapOpen(true)}
                  placeholder="Click to select location on map"
                  className="w-full bg-[#1e293b] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer hover:bg-[#1e293b]/80"
                  readOnly
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300 ml-1">Search Radius</label>
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                {radius} km
              </span>
            </div>
            <div className="relative h-2 bg-[#1e293b] rounded-full">
              <input
                type="range"
                min="1"
                max="100"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                style={{ width: `${radius}%` }}
              ></div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none transition-all duration-300"
                style={{ left: `${radius}%`, transform: `translate(-50%, -50%)` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 px-1">
              <span>1 km</span>
              <span>100 km</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-primary to-secondary text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Find Services
              </>
            )}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="bg-primary/10 text-primary p-1.5 rounded-lg">
              <Navigation className="w-5 h-5" />
            </span>
            Search Results
          </h3>
          
          <div className="grid gap-4">
            {results.map((result) => (
              <div key={result.id} className="bg-[#1e293b]/50 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all hover:bg-[#1e293b] group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{result.name}</h4>
                    <p className="text-sm text-slate-400">{result.category} • {result.location}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-lg border border-yellow-500/20">
                    <Star className="w-3.5 h-3.5 fill-yellow-500" />
                    <span className="text-xs font-bold">{result.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-4">{result.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    {result.distance} km away
                  </span>
                  <button className="text-sm font-semibold text-primary hover:text-white transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <LocationPickerModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        onSelect={setLocation} 
      />
    </div>
  );
};

export default ServiceFinder;
