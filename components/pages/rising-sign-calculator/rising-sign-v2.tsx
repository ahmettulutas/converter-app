'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Define zodiac sign type
type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

// Define interface for rising sign result
interface RisingSignResult {
  risingSign: ZodiacSign;
  position: string;
  explanation: string;
  technicalDetails: {
    julianDate: string;
    ascendantLongitude: string;
    latitude: string;
    longitude: string;
    timezoneOffset: string;
    lst: string;
    gmst: string;
  };
}

// Define type for zodiac explanations
type ZodiacExplanations = Record<ZodiacSign, string>;

export default function RisingSignCalculator(): JSX.Element {
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [risingSign, setRisingSign] = useState<RisingSignResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateRisingSign = (): void => {
    setError('');

    if (!birthDate || !birthTime || !latitude || !longitude) {
      setError('Please fill in all the fields');
      return;
    }

    try {
      // Parse input values
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      if (isNaN(lat) || lat < -90 || lat > 90) {
        setError('Latitude must be a number between -90 and 90');
        return;
      }

      if (isNaN(lon) || lon < -180 || lon > 180) {
        setError('Longitude must be a number between -180 and 180');
        return;
      }

      // Combine date and time into a UTC datetime
      const localDateTimeStr = `${birthDate}T${birthTime}:00`;
      const localDateTime = new Date(localDateTimeStr);

      if (isNaN(localDateTime.getTime())) {
        setError('Invalid date or time format');
        return;
      }

      // Convert to UTC for calculations
      const utcDateTime = new Date(localDateTime);

      // Calculate days since J2000 epoch (Noon, 1 Jan 2000 UTC)
      const dayZero = new Date('2000-01-01T12:00:00Z');
      const d = (utcDateTime.getTime() - dayZero.getTime()) / (1000 * 86400);

      // Julian centuries
      const T = d / 36525;

      // Calculate obliquity of the ecliptic
      const oe =
        (((((-4.34e-8 * T - 5.76e-7) * T + 0.0020034) * T - 1.831e-4) * T - 46.836769) * T) / 3600 + 23.4392794444444;
      const oer = (oe * Math.PI) / 180; // Convert to radians

      // Calculate Greenwich Mean Sidereal Time
      let gmst =
        ((67310.548 + (3155760000 + 8640184.812866) * T + 0.093104 * Math.pow(T, 2) - 6.2e-6 * Math.pow(T, 3)) / 3600) %
        24;

      // Calculate Local Sidereal Time
      const lst = (gmst + lon / 15) % 24;

      // Convert Local Sidereal Time to radians
      const lstr = (lst * 15 * Math.PI) / 180;

      // Calculate Ascendant
      const ascr = Math.atan2(
        Math.cos(lstr),
        -(Math.sin(lstr) * Math.cos(oer) + Math.tan((lat * Math.PI) / 180) * Math.sin(oer))
      );
      const asc = ((ascr * 180) / Math.PI + 360) % 360;

      // Convert ascendant to zodiac sign and position
      const sign = getZodiacSign(asc);
      const position = formatZodiacPosition(asc);

      // Generate explanation
      const explanation = getAscendantExplanation(sign);

      // Format technical details for display
      const technicalDetails = {
        julianDate: (d + 2451545).toFixed(5),
        ascendantLongitude: asc.toFixed(2) + '°',
        latitude: lat.toFixed(4) + '°',
        longitude: lon.toFixed(4) + '°',
        timezoneOffset: (localDateTime.getTimezoneOffset() / -60).toFixed(2) + ' hours',
        lst: formatHMS(lst),
        gmst: formatHMS(gmst),
      };

      // Set results
      setRisingSign({
        risingSign: sign,
        position,
        explanation,
        technicalDetails,
      });
    } catch (err) {
      console.error(err);
      setError('An error occurred during calculation. Please check your inputs.');
    }
  };

  // Helper functions

  // Format hours to HH:MM:SS.sss
  const formatHMS = (hours: number): string => {
    const h = Math.floor(hours);
    let remainder = (hours - h) * 60;
    const m = Math.floor(remainder);
    remainder = (remainder - m) * 60;
    const s = remainder.toFixed(3);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.padStart(6, '0')}`;
  };

  // Get zodiac sign from angle
  const getZodiacSign = (angle: number): ZodiacSign => {
    const signs: ZodiacSign[] = [
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn',
      'Aquarius',
      'Pisces',
    ];
    const signIndex = Math.floor(angle / 30);
    return signs[signIndex % 12];
  };

  // Format zodiac position (sign and degrees)
  const formatZodiacPosition = (angle: number): string => {
    const signIndex = Math.floor(angle / 30);
    const signs: ZodiacSign[] = [
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn',
      'Aquarius',
      'Pisces',
    ];
    const sign = signs[signIndex % 12];
    const degrees = angle % 30;
    return `${degrees.toFixed(1)}° ${sign}`;
  };

  // Generate explanation text based on the rising sign
  const getAscendantExplanation = (sign: ZodiacSign): string => {
    const explanations: ZodiacExplanations = {
      Aries:
        'With Aries rising, you present yourself to the world as confident, direct, and pioneering. You may appear energetic, assertive, and ready to take initiative.',
      Taurus:
        'With Taurus rising, you present yourself as grounded, reliable, and steady. Others may see you as practical, patient, and appreciative of beauty and comfort.',
      Gemini:
        'With Gemini rising, you come across as communicative, curious, and versatile. Your adaptable and intellectual nature is often the first thing people notice.',
      Cancer:
        'With Cancer rising, you appear nurturing, protective, and emotionally responsive. Others may perceive you as intuitive, caring, and connected to your home and family.',
      Leo: 'With Leo rising, you present yourself as confident, warm, and expressive. Others often notice your natural leadership, dramatic flair, and generous spirit.',
      Virgo:
        'With Virgo rising, you come across as analytical, detailed, and practical. Others may see you as organized, helpful, and health-conscious.',
      Libra:
        'With Libra rising, you present yourself as balanced, diplomatic, and relationship-oriented. Others often notice your charm, fairness, and aesthetic sensibilities.',
      Scorpio:
        'With Scorpio rising, you appear intense, magnetic, and somewhat mysterious. Others may perceive your powerful presence, emotional depth, and transformative nature.',
      Sagittarius:
        'With Sagittarius rising, you come across as optimistic, straightforward, and adventurous. Others often notice your philosophical outlook and love of freedom.',
      Capricorn:
        'With Capricorn rising, you present yourself as responsible, disciplined, and ambitious. Others may see you as mature, goal-oriented, and traditional.',
      Aquarius:
        'With Aquarius rising, you appear progressive, intellectual, and unconventional. Others often notice your humanitarian values and unique perspective.',
      Pisces:
        'With Pisces rising, you come across as compassionate, intuitive, and receptive. Others may perceive your dreamy, artistic nature and spiritual sensitivity.',
    };

    return (
      explanations[sign] ||
      `Your rising sign is ${sign}, which shapes how others perceive you and your approach to new situations.`
    );
  };

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
