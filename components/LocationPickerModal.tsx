import React, { useState, useEffect, useRef, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { X, Check } from "lucide-react";

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  initialLocation?: string;
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    { lat: 22.544412, lng: 88.342526 },
  );

  const [locationName, setLocationName] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });
  console.log("After Loading", isLoaded);

  // useEffect(() => {
  //   if (position) {
  //     // Simulate reverse geocoding
  //     setLocationName(
  //       `Lat: ${position.lat.toFixed(4)}, Lng: ${position.lng.toFixed(4)}`,
  //     );
  //   }
  // }, [position]);

  if (!isOpen) return null;

  if (!isLoaded) return <div>Loading map...</div>;

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
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative flex-1 min-h-[400px]">
          {/* <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={position || { lat: 51.505, lng: -0.09 }}
            zoom={13}
            options={mapOptions}
            onLoad={(map) => (mapRef.current = map)}
            onClick={handleMapClick}
          >
            {position && <Marker position={position} title={locationName} />}
          </GoogleMap> */}
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}>
            <Map
              defaultCenter={position}
              defaultZoom={13}
              mapId={"YOUR_MAP_ID"} // Optional: Use a Map ID for cloud-based styling
            >
              <AdvancedMarker position={position}>
                <Pin
                  background={"#FBBC04"}
                  glyphColor={"#000"}
                  borderColor={"#000"}
                />
              </AdvancedMarker>
            </Map>
          </APIProvider>

          <div className="absolute bottom-4 left-4 right-4 bg-[#0f172a]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 z-[1000] flex justify-between items-center">
            <div className="text-sm text-slate-300">
              {position ? (
                <span>
                  Selected:{" "}
                  <span className="text-primary font-mono">{locationName}</span>
                </span>
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
