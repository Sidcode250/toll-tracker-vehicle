import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Trip {
  id: string;
  start: string;
  end: string;
  distance: number;
  cost: number;
}

interface TripDetailsProps {
  trips: Trip[];
}

const TripDetails = ({ trips }: TripDetailsProps) => {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">Trip History</h2>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="p-4 rounded-lg bg-secondary/50 backdrop-blur-sm fade-in"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{trip.start} → {trip.end}</p>
                  <p className="text-sm text-muted-foreground">
                    Distance: {trip.distance.toFixed(1)} km
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    ${trip.cost.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default TripDetails;