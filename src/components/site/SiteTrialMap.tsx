
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SiteTrialMapProps {
  matchingTrials: any[];
}

const SiteTrialMap: React.FC<SiteTrialMapProps> = ({ matchingTrials }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
  
  useEffect(() => {
    // Check if mapbox is already loaded
    if (!showTokenInput && mapboxToken && mapContainerRef.current) {
      // In a real implementation, this would initialize Mapbox
      // This is a placeholder for the actual Mapbox implementation
      const container = mapContainerRef.current;
      container.innerHTML = `
        <div class="flex items-center justify-center h-full">
          <div class="text-center">
            <p class="mb-4">Map would display ${matchingTrials.length} trial locations</p>
            <p class="text-sm text-muted-foreground">Using Mapbox token: ${mapboxToken.substring(0, 10)}...</p>
          </div>
        </div>
      `;
    }
  }, [showTokenInput, mapboxToken, matchingTrials]);
  
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      setShowTokenInput(false);
    }
  };
  
  // This is a placeholder for the actual map. In a real implementation,
  // you would initialize Mapbox GL JS here and show trial locations
  
  return (
    <Card className="w-full h-[500px]">
      <CardContent className="p-0 h-full">
        {showTokenInput ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-2/3 max-w-md">
              <h3 className="font-medium text-lg mb-2">Enter Mapbox Token</h3>
              <p className="text-muted-foreground mb-4">
                Please enter your Mapbox public token to view the map. You can find this in your Mapbox account.
              </p>
              <form onSubmit={handleTokenSubmit} className="space-y-2">
                <input
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4..."
                  className="w-full px-3 py-2 border rounded-md"
                />
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-2 rounded-md"
                  disabled={!mapboxToken}
                >
                  Load Map
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div ref={mapContainerRef} className="w-full h-full"></div>
        )}
      </CardContent>
    </Card>
  );
};

export default SiteTrialMap;
