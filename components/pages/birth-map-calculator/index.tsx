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
import { useTranslation } from '@/i18n/client';
import { PlaceResult } from '@/app/api/places/route';
import { LocationSelect } from '@/components/shared/location-select';

type ChartData = {
  planets: { [key: string]: number[] };
  cusps: number[];
};

// const CountryComboBox = lazy(() => import('../../shared/countries-selector'));
// const CityComboBox = lazy(() => import('../../shared/cities-selector'));

export default function DualBirthMapCalculator({ currentLocale }: { currentLocale: LocaleType }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',

    country: '',
  });
  const [city, setCity] = useState<PlaceResult | null>(() => {
    if (typeof window !== 'undefined') {
      const storedCity = window.localStorage.getItem('city');
      return storedCity ? JSON.parse(storedCity) : null;
    }
    return null;
  });
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const natalRef = useRef<HTMLDivElement>(null);
  const transitRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(currentLocale, 'translation');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !city?.latitude) {
      alert(t('msg.fillAllFields'));
      return;
    }
    const data = computeChartData(formData.date, formData.time, city?.latitude, city?.longitude);
    setChartData(data);
  };
  const handleCitySelect = (city: PlaceResult | null) => {
    setCity(city);
    window.localStorage.setItem('city', JSON.stringify(city));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    }
  }, [chartData]);

  return (
    <div className="flex flex-col gap-4 lg:gap-6 mx-auto">
      <Card className="mx-auto w-full lg:max-w-md shadow-md">
        <CardHeader>
          <CardTitle>{t('labels.birthMapCalculator')}</CardTitle>
          <CardDescription>{t('labels.generateChartsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                {t('labels.fullName')}
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={handleInputChange}
                placeholder={t('labels.enterFullName')}
              />
            </div>

            <div>
              <label htmlFor="date" className="block font-medium mb-1">
                {t('labels.birthDate')}
              </label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
            </div>

            <div>
              <label htmlFor="time" className="block font-medium mb-1">
                {t('labels.birthTime')}
              </label>
              <Input id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="block font-medium mb-1">
                {t('labels.country')}
                <LocationSelect
                  currentLocale={currentLocale}
                  onChange={handleCitySelect}
                  value={city}
                  placeholder={t('labels.selectCity')}
                  label={t('labels.selectCity')}
                />
              </label>
            </div>

            <Button type="submit" className="w-full">
              {t('labels.generateCharts')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mx-auto py-4 w-full shadow-md">
        <CardContent className="flex flex-col lg:flex-row gap-4 items-center">
          <div>
            <h3>{t('labels.natalChart')}</h3>
            <div id="natal" ref={natalRef} className="max-w-2xl"></div>
          </div>
          <div>
            <h3>{t('labels.transitChart')}</h3>
            <div id="transit" ref={transitRef} className="max-w-2xl"></div>
          </div>
        </CardContent>
      </Card>

      {chartData && (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
          <Card className="mx-auto py-4 flex-1 w-full">
            <CardContent>
              <h3>{t('labels.planets')}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('labels.planet')}</TableHead>
                    <TableHead>{t('labels.longitude')}</TableHead>
                    <TableHead>{t('labels.house')}</TableHead>
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
            </CardContent>
          </Card>

          <Card className="mx-auto py-4 flex-1 w-full">
            <CardContent>
              <h3>{t('labels.aspects')}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('labels.aspect')}</TableHead>
                    <TableHead>{t('labels.between')}</TableHead>
                    <TableHead>{t('labels.orb')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{t('labels.conjunction')}</TableCell>
                    <TableCell>Sun - Moon</TableCell>
                    <TableCell>2°</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t('labels.square')}</TableCell>
                    <TableCell>Mars - Jupiter</TableCell>
                    <TableCell>5°</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
