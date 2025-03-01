'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import {
  calculateAscendant,
  getZodiacSignAndDegrees,
  getSignExplanation,
  formatDMS,
  formatHMS,
  calculateJulianDate,
} from '@/lib/utils/calculate-rising-v2';

export default function RisingSignCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [risingSign, setRisingSign] = useState<{
    sign: string;
    position: string;
    explanation: string;
    technicalDetails: {
      julianDate: string;
      gmst: string;
      lst: string;
      ascendantLongitude: string;
      latitude: string;
      longitude: string;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const calculateRisingSign = () => {
    setError(null);

    if (!birthDate || !birthTime || !latitude || !longitude) {
      setError('Please fill in all the fields');
      return;
    }

    try {
      const [year, month, day] = birthDate.split('-').map((num) => parseInt(num));
      const [hours, minutes] = birthTime.split(':').map((num) => parseInt(num));
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        setError('Invalid latitude or longitude values');
        return;
      }

      // ✅ Step 1: Convert Local Time to UTC
      const birthDateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
      const timezoneOffsetMinutes = birthDateTime.getTimezoneOffset(); // Offset in minutes
      const timezoneOffsetHours = -timezoneOffsetMinutes / 60; // Convert to hours
      const UT = hours - timezoneOffsetHours + minutes / 60;

      // ✅ Step 2: Compute Julian Date
      const julianDate = calculateJulianDate(year, month, day, UT, minutes);

      // ✅ Step 3: Compute Ascendant Using New Formula (FIX: Added `minutes` argument)
      const ascendant = calculateAscendant(UT, minutes, lat, lng, julianDate);

      // ✅ Step 4: Convert Ascendant to Zodiac Sign
      const { sign, degrees, minutes: arcMinutes, seconds } = getZodiacSignAndDegrees(ascendant);

      // ✅ Debugging & Output

      setRisingSign({
        sign,
        position: `${sign} - ${degrees}°${arcMinutes}'${seconds}"`,
        explanation: getSignExplanation(sign),
        technicalDetails: {
          timezoneOffset: `UTC ${timezoneOffsetHours >= 0 ? '+' : ''}${timezoneOffsetHours}`,

          ascendantLongitude: `${ascendant.toFixed(2)}° (${formatDMS(ascendant)})`,
          latitude: `${lat}° (${formatDMS(lat)})`,
          longitude: `${lng}° (${formatDMS(lng)})`,
        },
      });
    } catch (err) {
      setError('There was an error calculating your rising sign. Please check your inputs.');
      console.error(err);
    }
  };

  console.log(getZodiacSignAndDegrees(27));
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Rising Sign Calculator</CardTitle>
          <CardDescription>Enter your birth details to discover your astrological rising sign.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthTime">Birth Time (24-hour format, local time)</Label>
              <Input id="birthTime" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="text"
                  placeholder="e.g., 41.01"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
                <p className="text-xs text-gray-500">(-90 to 90)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="text"
                  placeholder="e.g., 28.95"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
                <p className="text-xs text-gray-500">(-180 to 180)</p>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>

          {risingSign && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Rising Sign: {risingSign.position}</h3>
                <p className="text-sm text-gray-700">{risingSign.explanation}</p>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium">Technical Details</h4>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>Julian Date: {risingSign.technicalDetails.julianDate}</li>
                    <li>Greenwich Mean Sidereal Time: {risingSign.technicalDetails.gmst}</li>
                    <li>Local Sidereal Time: {risingSign.technicalDetails.lst}</li>
                    <li>Ascendant Longitude: {risingSign.technicalDetails.ascendantLongitude}</li>
                    <li>Birth Latitude: {risingSign.technicalDetails.latitude}</li>
                    <li>Birth Longitude: {risingSign.technicalDetails.longitude}</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={calculateRisingSign}>
            Calculate Rising Sign
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setBirthDate('1993-12-09');
              setBirthTime('09:00');
              setLatitude('41.01667');
              setLongitude('28.95');
            }}
          >
            Fill Example: Istanbul, Dec 9, 1993, 9:00
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
