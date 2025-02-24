'use client';

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Chart } from '@astrodraw/astrochart';
import ComboboxSkeleton from '@/components/skeletons/combobox';
import { computeChartData } from '@/lib/utils/calculate-birthmap';
import { LocaleType } from '@/i18n/settings';

type ChartData = {
  planets: { [key: string]: number[] };
  cusps: number[];
};
const CountryComboBox = lazy(() => import('../../shared/countries-selector'));
const CityComboBox = lazy(() => import('../../shared/cities-selector'));

export default function DualBirthMapCalculator({ currentLocale }: { currentLocale: LocaleType }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    latitude: 0,
    longitude: 0,
    country: '',
    city: '',
  });

  const [chartData, setChartData] = useState<ChartData | null>(null);
  const natalRef = useRef<HTMLDivElement>(null);
  const transitRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(formData);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.city) {
      alert('Please fill out all required fields.');
      return;
    }
    const data = computeChartData(formData.date, formData.time, formData.latitude, formData.longitude);
    setChartData(data);
  };

  useEffect(() => {
    if (chartData && natalRef.current && transitRef.current) {
      natalRef.current.innerHTML = '';
      transitRef.current.innerHTML = '';

      const natalChart = new Chart(natalRef.current.id, 400, 400);
      const radix = natalChart.radix(chartData);
      radix.aspects();

      const transitChart = new Chart(transitRef.current.id, 400, 400);
      const transit = transitChart.radix(chartData);
      transit.transit(chartData);
    }
  }, [chartData]);

  return (
    <Card className="max-w-2xl mx-auto mt-8 p-4">
      <CardHeader>
        <CardTitle>Dual Birth Map Calculator</CardTitle>
        <CardDescription>Generates both natal and transit charts.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block font-medium mb-1">
              Birth Date
            </label>
            <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
          </div>

          <div>
            <label htmlFor="time" className="block font-medium mb-1">
              Birth Time (24h)
            </label>
            <Input id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <label htmlFor="country" className="block font-medium mb-1">
              Country
            </label>
            <Suspense fallback={<ComboboxSkeleton />}>
              <CountryComboBox
                currentLocale={currentLocale}
                value={formData.country}
                title="Select Country"
                onChange={(selectedCountry) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: selectedCountry,
                    city: '',
                    latitude: 0,
                    longitude: 0,
                  }))
                }
              />
            </Suspense>
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="block font-medium mb-1">
              City
            </label>
            <Suspense fallback={<ComboboxSkeleton />}>
              <CityComboBox
                selectedCountry={formData.country}
                selectedCity={formData.city}
                title="Select City"
                onChange={(selectedCity, latitude, longitude) =>
                  setFormData((prev) => ({
                    ...prev,
                    city: selectedCity,
                    latitude,
                    longitude,
                  }))
                }
              />
            </Suspense>
          </div>

          <Button type="submit" className="w-full">
            Generate Charts
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between mt-4">
        <div>
          <h3>Natal Chart</h3>
          <div id="natal" ref={natalRef} style={{ width: 400, height: 400 }}></div>
        </div>
        <div>
          <h3>Transit Chart</h3>
          <div id="transit" ref={transitRef} style={{ width: 400, height: 400 }}></div>
        </div>
      </CardFooter>

      {chartData && (
        <>
          <h3>Planets</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Planet</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>House</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(chartData.planets).map(([planet, [longitude]]) => (
                <TableRow key={planet}>
                  <TableCell>{planet}</TableCell>
                  <TableCell>{longitude.toFixed(2)}°</TableCell>
                  <TableCell>{Math.floor(longitude / 30) + 1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h3>Aspects</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aspect</TableHead>
                <TableHead>Between</TableHead>
                <TableHead>Orb</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Conjunction</TableCell>
                <TableCell>Sun - Moon</TableCell>
                <TableCell>2°</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Square</TableCell>
                <TableCell>Mars - Jupiter</TableCell>
                <TableCell>5°</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </Card>
  );
}
