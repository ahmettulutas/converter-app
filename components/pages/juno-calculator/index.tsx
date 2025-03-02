'use client';

import React, { useState, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';
import julian from 'astronomia/julian';
import jupitermoons from 'astronomia/jupitermoons';
import { Line } from 'react-chartjs-2';
import ComboboxSkeleton from '@/components/skeletons/combobox';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const CountryComboBox = lazy(() => import('@/components/shared/countries-selector'));
const CityComboBox = lazy(() => import('@/components/shared/cities-selector'));

type JunoPosition = {
  x: number;
  y: number;
};

type Aspect = {
  type: string;
  angle: number;
  orb: number;
};

export default function JunoCalculator({ currentLocale }: { currentLocale: LocaleType }) {
  const { t } = useTranslation(currentLocale, 'translation');

  const [julianDate, setJulianDate] = useState<string>(julian.DateToJD(new Date()).toFixed(5));
  const [junoPosition, setJunoPosition] = useState<JunoPosition | null>(null);
  const [aspects, setAspects] = useState<Aspect[]>([]);
  const [junoSign, setJunoSign] = useState<string>('');
  const [junoDegree, setJunoDegree] = useState<string>('');
  const [junoHouse, setJunoHouse] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    country: '',
    city: '',
    latitude: 0,
    longitude: 0,
  });

  const zodiacSigns = [
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    if (!formData.date || !formData.time || !formData.city) {
      alert(t('msg.fillAllFields'));
      return;
    }

    const dateTime = new Date(`${formData.date}T${formData.time}`);
    const jde = julian.DateToJD(dateTime);
    const positions = jupitermoons.positions(jde);
    const juno = positions[jupitermoons.ganymede]; // Assuming Ganymede represents Juno

    setJulianDate(jde.toFixed(5));
    setJunoPosition({ x: juno.x, y: juno.y });
    calculateAspects(juno);
    determineZodiacAndHouse(juno);
  };

  const calculateAspects = (juno: { x: number; y: number }) => {
    const keyPlanets = [
      { name: 'Sun', angle: 0 },
      { name: 'Moon', angle: 90 },
      { name: 'Mercury', angle: 180 },
      { name: 'Venus', angle: 120 },
      { name: 'Mars', angle: 60 },
    ];

    const calculatedAspects: Aspect[] = keyPlanets.map((planet) => {
      const angle = Math.atan2(juno.y, juno.x) * (180 / Math.PI);
      const orb = Math.abs(angle - planet.angle);
      const aspectType = getAspectType(orb);
      return { type: `${aspectType} (${planet.name})`, angle, orb };
    });

    setAspects(calculatedAspects.filter((aspect) => aspect.type !== 'None'));
  };

  const getAspectType = (orb: number) => {
    if (orb <= 5) return 'Conjunction';
    if (Math.abs(orb - 180) <= 5) return 'Opposition';
    if (Math.abs(orb - 120) <= 5) return 'Trine';
    if (Math.abs(orb - 90) <= 5) return 'Square';
    if (Math.abs(orb - 60) <= 5) return 'Sextile';
    return 'None';
  };

  const determineZodiacAndHouse = (juno: { x: number; y: number }) => {
    const angle = (Math.atan2(juno.y, juno.x) * (180 / Math.PI) + 360) % 360;
    const signIndex = Math.floor(angle / 30);
    const degree = (angle % 30).toFixed(2);

    setJunoSign(zodiacSigns[signIndex]);
    setJunoDegree(`${degree}°`);
    setJunoHouse(Math.floor(angle / 30) + 1); // Simplified house calculation
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('labels.junoCalculator')}</CardTitle>
        <CardDescription>{t('labels.junoDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input name="name" type="text" placeholder={t('labels.fullName')} onChange={handleInputChange} />
          <Input name="date" type="date" onChange={handleInputChange} required />
          <Input name="time" type="time" onChange={handleInputChange} required />

          <Suspense fallback={<ComboboxSkeleton />}>
            <CountryComboBox
              title={t('labels.selectCountry')}
              currentLocale={currentLocale}
              value={formData.country}
              onChange={(country) => setFormData((prev) => ({ ...prev, country, city: '', latitude: 0, longitude: 0 }))}
            />
          </Suspense>

          <Suspense fallback={<ComboboxSkeleton />}>
            <CityComboBox
              title={t('labels.selectCity')}
              selectedCountry={formData.country}
              selectedCity={formData.city}
              onChange={(city, lat, long) =>
                setFormData((prev) => ({ ...prev, city, latitude: 40.7721138, longitude: 29.9505623 }))
              }
            />
          </Suspense>

          <Button onClick={handleCalculate} className="w-full">
            {t('labels.calculate')}
          </Button>
        </div>

        {junoPosition && (
          <>
            {/* Dynamic Result Box */}
            <div className="bg-purple-500 text-white p-4 rounded-lg mt-4 text-center">
              <p>
                {t('labels.yourJunoSign')} <strong>{junoSign}</strong> at <strong>{junoDegree}</strong>.{' '}
                {t('labels.inHouse')} <strong>{junoHouse}th</strong>.
              </p>
              <h3 className="mt-4 font-bold">{t('labels.findOutMore')}</h3>
              <p className="text-sm">{t('labels.fullBirthChart')}</p>
              <Button className="mt-2 bg-purple-800 text-white">{t('labels.seeFullChart')}</Button>
            </div>

            {/* Juno Position Table */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg">{t('labels.junoPosition')}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('labels.coordinate')}</TableHead>
                    <TableHead>{t('labels.value')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>X</TableCell>
                    <TableCell>{junoPosition.x.toFixed(5)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Y</TableCell>
                    <TableCell>{junoPosition.y.toFixed(5)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Graph */}
            <div className="my-6">
              <h3 className="font-semibold text-lg">{t('labels.graph')}</h3>
              <Line
                data={{
                  labels: ['X', 'Y'],
                  datasets: [
                    {
                      label: t('labels.junoPath'),
                      data: [junoPosition.x, junoPosition.y],
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 2,
                      pointRadius: 5,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>

            {/* Aspects Table */}
            {aspects.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg">{t('labels.aspects')}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('labels.aspectType')}</TableHead>
                      <TableHead>{t('labels.angle')}</TableHead>
                      <TableHead>{t('labels.orb')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aspects.map((aspect, index) => (
                      <TableRow key={index}>
                        <TableCell>{aspect.type}</TableCell>
                        <TableCell>{aspect.angle.toFixed(2)}°</TableCell>
                        <TableCell>{aspect.orb.toFixed(2)}°</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{t('labels.basedOnMeeus')}</p>
      </CardFooter>
    </Card>
  );
}
