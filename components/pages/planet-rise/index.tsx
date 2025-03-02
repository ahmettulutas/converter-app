'use client';

import { useState, useEffect } from 'react';
import { PlanetRise } from 'astronomia/rise';
import { Planet } from 'astronomia/planetposition';

import {
  julian,
  planetposition,
  vsop87Dvenus,
  vsop87Dmercury,
  mercury,
  vsop87Dmars,
  vsop87Djupiter,
  vsop87Dsaturn,
  vsop87Duranus,
  vsop87Dneptune,
} from 'astronomia';
// Define available planets (VSOP87 models)
const PLANETS = {
  mercury: new Planet(mercury),
  venus: new Planet(vsop87Dvenus),
  mars: new Planet(vsop87Dmars),
  jupiter: new Planet(vsop87Djupiter),
  saturn: new Planet(vsop87Dsaturn),
  uranus: new Planet(vsop87Duranus),
  neptune: new Planet(vsop87Dneptune),
};

export function usePlanetRise(planetName: keyof typeof PLANETS, lat: number, lon: number, date: Date) {
  const [result, setResult] = useState<{ rise: string; transit: string; set: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function calculate() {
      try {
        setLoading(true);
        setError(null);

        // Convert date to Julian Day
        const jd = julian.Calendar.fromDate(date).toJD();

        // Load VSOP87 planetary data
        const earth = new Planet(earth);
        const planet = PLANETS[planetName];

        // Calculate rise, transit, and set times
        const pr = new PlanetRise(jd, lat, lon, earth, planet);
        const times = pr.times();

        // Convert Julian Days to readable time
        const formatTime = (jd: number) => {
          const utcDate = julian.Calendar.fromJD(jd).toDate();
          return utcDate.toISOString().split('T')[1].slice(0, 5); // Returns HH:MM
        };

        setResult({
          rise: formatTime(times.rise),
          transit: formatTime(times.transit),
          set: formatTime(times.set),
        });
      } catch (err) {
        setError('Failed to compute planetary rise times.');
      } finally {
        setLoading(false);
      }
    }

    calculate();
  }, [planetName, lat, lon, date]);

  return { result, loading, error };
}

export default function PlanetRiseCalculator() {
  const [planet, setPlanet] = useState('mars');
  const [lat, setLat] = useState(40.7128); // Default: New York
  const [lon, setLon] = useState(-74.006);
  const [date, setDate] = useState(new Date());

  const { result, loading, error } = usePlanetRise(planet as any, lat, lon, date);

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Planet Rise Calculator</h2>

      <div className="mt-4">
        <label className="block font-medium">Select Planet:</label>
        <select value={planet} onChange={(e) => setPlanet(e.target.value)} className="border p-2 w-full">
          <option value="mercury">Mercury</option>
          <option value="venus">Venus</option>
          <option value="mars">Mars</option>
          <option value="jupiter">Jupiter</option>
          <option value="saturn">Saturn</option>
          <option value="uranus">Uranus</option>
          <option value="neptune">Neptune</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block font-medium">Latitude:</label>
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(parseFloat(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Longitude:</label>
        <input
          type="number"
          value={lon}
          onChange={(e) => setLon(parseFloat(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Date:</label>
        <input
          type="date"
          value={date.toISOString().split('T')[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          result && (
            <div className="bg-gray-100 p-4 rounded">
              <p>
                <strong>Rise Time:</strong> {result.rise} UTC
              </p>
              <p>
                <strong>Transit Time:</strong> {result.transit} UTC
              </p>
              <p>
                <strong>Set Time:</strong> {result.set} UTC
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
