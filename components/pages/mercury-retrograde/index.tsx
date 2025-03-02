'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar'; // ShadCN Calendar
import { julian, planetposition } from 'astronomia';
import vsop87Dmercury from 'astronomia/data/vsop87Dmercury';
import vsop87Dearth from 'astronomia/data/vsop87Dearth';

// Function to check if Mercury is retrograde on a given date
const isMercuryRetrograde = (jd: number) => {
  const earth = new planetposition.Planet(vsop87Dearth);
  const mercury = new planetposition.Planet(vsop87Dmercury);

  const mercuryCoordsToday = mercury.position(jd);
  const mercuryCoordsYesterday = mercury.position(jd - 1);

  return mercuryCoordsToday.ra < mercuryCoordsYesterday.ra; // Retrograde detection
};

// Function to find Mercury Retrograde periods in a given year
const findRetrogradePeriods = (year: number) => {
  let retrogradeDates = new Set<string>();

  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= 31; day++) {
      if (new Date(year, month - 1, day).getMonth() !== month - 1) break; // Skip invalid dates

      const jd = julian.CalendarGregorianToJD(year, month, day);
      const retro = isMercuryRetrograde(jd);

      if (retro) {
        retrogradeDates.add(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
      }
    }
  }
  return retrogradeDates;
};

const MercuryRetrogradeCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [retrogradeDates, setRetrogradeDates] = useState(new Set<string>());

  const calculateRetrogrades = () => {
    const retroDates = findRetrogradePeriods(selectedYear);
    setRetrogradeDates(retroDates);
  };

  return (
    <div className="p-6">
      <Card title="Mercury Retrograde Calendar" className="w-full max-w-lg mx-auto text-center items-center">
        <label className="text-lg font-semibold">Select Year:</label>
        <Input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-2 border rounded-md text-center"
        />
        <Button onClick={calculateRetrogrades} className="mt-4">
          Show Retrogrades
        </Button>

        {/* ShadCN Calendar */}
        <div className="mt-6">
          <Calendar
            mode="single"
            modifiers={{
              mercuryRetrograde: (date) => retrogradeDates.has(date.toISOString().split('T')[0]),
            }}
            modifiersClassNames={{
              mercuryRetrograde: 'bg-red-500 text-white rounded-md', // Red highlight for retrograde dates
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default MercuryRetrogradeCalendar;
