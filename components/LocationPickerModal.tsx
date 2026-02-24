import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { X, Check } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  initialLocation?: string;
}

const LocationMarker = ({ position, setPosition }: { position: L.LatLng | null, setPosition: (pos: L.LatLng) => void }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    if (position) {
      // Simulate reverse geocoding
      setLocationName(`Lat: ${position.lat.toFixed(4)}, Lng: ${position.lng.toFixed(4)}`);
    }
  }, [position]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (locationName) {
      onSelect(locationName);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1e293b]">
          <h3 className="text-lg font-bold text-white">Select Location</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="relative flex-1 min-h-[400px]">
          <MapContainer 
            center={[51.505, -0.09]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
          
          <div className="absolute bottom-4 left-4 right-4 bg-[#0f172a]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 z-[1000] flex justify-between items-center">
            <div className="text-sm text-slate-300">
              {position ? (
                <span>Selected: <span className="text-primary font-mono">{locationName}</span></span>
              ) : (
                <span>Click on the map to select a location</span>
              )}
            </div>
            <button 
              onClick={handleConfirm}
              disabled={!position}
              className="bg-primary text-black px-4 py-2 rounded-lg font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Check className="w-4 h-4" />
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPickerModal;
