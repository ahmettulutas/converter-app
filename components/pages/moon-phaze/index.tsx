'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { julian, moonphase } from 'astronomia';

// Moon phase mappings (icons & descriptions)
const moonPhases = [
  { name: 'New Moon', emoji: '🌑', profile: 'A time for new beginnings and setting intentions.' },
  { name: 'Waxing Crescent', emoji: '🌒', profile: 'A time of growth, learning, and fresh energy.' },
  { name: 'First Quarter', emoji: '🌓', profile: 'A time for decision-making and taking action.' },
  { name: 'Waxing Gibbous', emoji: '🌔', profile: 'A period of refinement, preparation, and building strength.' },
  { name: 'Full Moon', emoji: '🌕', profile: 'A time of completion, celebration, and heightened energy.' },
  { name: 'Waning Gibbous', emoji: '🌖', profile: 'A time of gratitude, sharing, and releasing excess energy.' },
  { name: 'Last Quarter', emoji: '🌗', profile: 'A phase of reflection, evaluation, and letting go.' },
  { name: 'Waning Crescent', emoji: '🌘', profile: 'A time of rest, spiritual insight, and preparation for renewal.' },
];

const MoonPhaseCalculator = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [moonPhase, setMoonPhase] = useState('');
  const [moonPhaseNumber, setMoonPhaseNumber] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(`User Location: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          console.warn('Location access denied or unavailable.');
        }
      );
    }
  }, []);

  const calculateMoonPhase = () => {
    if (!selectedDate) return;
    const [year, month, day] = selectedDate.split('-').map(Number);
    const jd = julian.CalendarGregorianToJD(year, month, day);

    // Find the moon phase number (1-29.53 days)
    const phaseNumber = ((jd - moonphase.meanNew(year)) % 29.53).toFixed(1);

    // Determine the moon phase
    let phaseIndex = Math.floor((phaseNumber / 29.53) * 8);
    if (phaseIndex >= 8) phaseIndex = 0; // Ensure cycle restarts

    setMoonPhase(moonPhases[phaseIndex].name);
    setMoonPhaseNumber(phaseNumber);
    setProfile(moonPhases[phaseIndex].profile);
  };

  return (
    <div className="p-6">
      <Card title="Moon Phase Calculator" className="w-full max-w-md mx-auto text-center">
        <Input
          type="date"
          placeholder="Select a Date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <Button onClick={calculateMoonPhase} className="mt-4">
          Calculate Moon Phase
        </Button>
        {moonPhase && (
          <div className="mt-4 text-lg font-semibold flex flex-col items-center">
            <span className="text-6xl">{moonPhases.find((p) => p.name === moonPhase)?.emoji}</span>
            <p className="mt-2 text-xl">{moonPhase}</p>
            <p className="mt-2 text-sm text-gray-400">Phase {moonPhaseNumber} / 29.53</p>
            <p className="mt-2 text-md italic">{profile}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MoonPhaseCalculator;
