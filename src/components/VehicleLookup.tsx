import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface VehicleLookupProps {
  onSearch: (vehicleNumber: string) => void;
}

const VehicleLookup = ({ onSearch }: VehicleLookupProps) => {
  const [vehicleNumber, setVehicleNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicleNumber.trim()) {
      onSearch(vehicleNumber.trim().toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter vehicle number (e.g., KA01AB1234)"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
        className="w-full"
      />
      <Button type="submit" className="px-6">
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </form>
  );
};

export default VehicleLookup;