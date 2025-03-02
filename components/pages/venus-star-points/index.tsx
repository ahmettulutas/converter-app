'use client';

import { useState } from 'react';

import { julian, planetposition, vsop87Dvenus, sun } from 'astronomia';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const VenusStarPointCalculator = () => {
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');

  const calculateVenusStarPoint = () => {
    if (!date) return;
    const [year, month, day] = date.split('-').map(Number);
    const jd = julian.CalendarGregorianToJD(year, month, day);
    const venusData = new planetposition.Planet(vsop87Dvenus);
    const sunData = new planetposition.Planet(sun);

    const venusLongitude = venusData.position(jd).ra;
    const sunLongitude = sunData.position(jd).ra;

    setResult(
      Math.abs(venusLongitude - sunLongitude) < 5
        ? 'You have a Venus Star Point connection!'
        : 'No Venus Star Point today.'
    );
  };

  return (
    <Card title="Venus Star Point Calculator">
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <Button onClick={calculateVenusStarPoint} className="mt-4">
        Check
      </Button>
      {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
    </Card>
  );
};

export default VenusStarPointCalculator;
