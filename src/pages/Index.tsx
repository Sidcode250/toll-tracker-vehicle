import React, { useState } from 'react';
import VehicleLookup from '@/components/VehicleLookup';
import TripDetails from '@/components/TripDetails';
import Map from '@/components/Map';
import { useToast } from '@/components/ui/use-toast';

// Sample data - in a real app, this would come from an API
const SAMPLE_ROUTES = {
  'KA01AB1234': {
    trips: [
      {
        id: '1',
        start: 'Electronic City',
        end: 'Whitefield',
        distance: 25.4,
        cost: 45.72,
        route: [
          [77.6714, 12.8458], // Electronic City
          [77.7409, 12.9698]  // Whitefield
        ]
      },
      {
        id: '2',
        start: 'Whitefield',
        end: 'Indiranagar',
        distance: 12.8,
        cost: 23.04,
        route: [
          [77.7409, 12.9698], // Whitefield
          [77.6411, 12.9718]  // Indiranagar
        ]
      }
    ]
  },
  'KA02CD5678': {
    trips: [
      {
        id: '1',
        start: 'Koramangala',
        end: 'MG Road',
        distance: 7.2,
        cost: 12.96,
        route: [
          [77.6271, 12.9349], // Koramangala
          [77.6197, 12.9719]  // MG Road
        ]
      }
    ]
  }
};

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<[number, number][]>([]);
  const { toast } = useToast();

  const handleSearch = (vehicleNumber: string) => {
    if (SAMPLE_ROUTES[vehicleNumber]) {
      setSelectedVehicle(vehicleNumber);
      const latestTrip = SAMPLE_ROUTES[vehicleNumber].trips[0];
      setCurrentRoute(latestTrip.route);
      toast({
        title: "Vehicle Found",
        description: `Showing toll history for ${vehicleNumber}`,
      });
    } else {
      toast({
        title: "Vehicle Not Found",
        description: "Try KA01AB1234 or KA02CD5678 for demo",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Toll Tracker</h1>
          <p className="text-muted-foreground">
            Track toll charges based on vehicle movement
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <VehicleLookup onSearch={handleSearch} />
        </div>

        {selectedVehicle && SAMPLE_ROUTES[selectedVehicle] && (
          <div className="space-y-6 fade-in">
            <Map route={currentRoute} />
            
            <TripDetails 
              trips={SAMPLE_ROUTES[selectedVehicle].trips} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;