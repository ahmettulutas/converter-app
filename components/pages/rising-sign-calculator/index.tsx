'use client';

import React, { lazy, Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Clock } from 'lucide-react';

import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { PlaceResult } from '@/app/api/places/route';
import { DatePicker } from '@/components/ui/date-picker';

import { Checkbox } from '@/components/ui/checkbox';
import { calculateAscendant, RisingSignResult } from '@/lib/utils/calculate-rising';
import { useTranslation } from '@/i18n/client';

import Link from 'next/link';
import { LocaleType } from '@/i18n/settings';
import ComboboxSkeleton from '@/components/skeletons/combobox';

const LocationSelect = lazy(() => import('@/components/shared/location-select'));
const SignResult = lazy(() => import('./result'));

export default function RisingSignForm({
  currentLocale,
  initialSign,
}: {
  currentLocale: LocaleType;
  initialSign?: string;
}) {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [unknownBirthTime, setUnknownBirthTime] = useState(false);
  const [birthTime, setBirthTime] = useState('');
  const [city, setCity] = useState<PlaceResult | null>(() => {
    if (typeof window !== 'undefined') {
      const storedCity = window.localStorage.getItem('city');
      return storedCity ? JSON.parse(storedCity) : null;
    }
    return null;
  });
  const [risingSign, setRisingSign] = useState<RisingSignResult | null>(null);
  const [error, setError] = useState('');

  const { t } = useTranslation(currentLocale, 'translation');

  const translatedSign = initialSign ? t(`labels.${initialSign}`) : '';
  const dynamicTitle = translatedSign
    ? t('metaData.risingSignCalculator.dynamicPageTitle', { translatedSign })
    : undefined;
  const dynamicDescription = translatedSign
    ? t('metaData.risingSignCalculator.dynamicPageDescription', { translatedSign })
    : undefined;

  const handleCalculate = () => {
    if (!birthDate || !city?.latitude || !city?.longitude) return;

    const formattedBirthDate = format(birthDate, 'yyyy-MM-dd');
    const { result, error } = calculateAscendant(
      formattedBirthDate,
      birthTime,
      String(city.latitude),
      String(city.longitude)
    );
    if (error) {
      setError(t(`msg.${error}`));
      setRisingSign(null);
    } else {
      setError('');
      setRisingSign(result);
    }
  };
  const handleCitySelect = (city: PlaceResult | null) => {
    setCity(city);
    window.localStorage.setItem('city', JSON.stringify(city));
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{dynamicTitle ? <p>{dynamicTitle}</p> : t('risingSign.title')}</CardTitle>
        <CardDescription>{dynamicDescription ?? t('risingSign.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCalculate();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="date">{t('labels.birthDate')}</Label>
            <Suspense fallback={<ComboboxSkeleton />}>
              <DatePicker
                title={t('labels.birthDate')}
                onChange={(date) => setBirthDate(date)}
                initialValue={birthDate}
              />
            </Suspense>
          </div>

          {/* Doğum Saati */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                title={t('labels.idkMyBirthTime')}
                id="unknown-birth-time"
                checked={unknownBirthTime}
                onCheckedChange={(checked) => {
                  if (checked) setBirthTime('12:00');
                  setUnknownBirthTime(checked as boolean);
                }}
              />
              <Label htmlFor="unknown-birth-time">{t('labels.idkMyBirthTime')}</Label>
            </div>
          </div>

          {!unknownBirthTime && (
            <div className="space-y-2">
              <Label htmlFor="time">{t('labels.birthTime')}</Label>
              <div className="relative">
                <Input
                  id="time"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="rounded-xl pl-10"
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}
          <Suspense fallback={<ComboboxSkeleton />}>
            <LocationSelect
              currentLocale={currentLocale}
              onChange={handleCitySelect}
              value={city}
              placeholder={t('labels.selectCity')}
              label={t('labels.selectCity')}
            />
          </Suspense>

          {/* Hesapla Butonu */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" className="w-full rounded-xl Hover:bg-primary/90 text-primary-foreground">
                  {t('labels.calculate')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('labels.clickToLearnRs')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </CardContent>

      {risingSign && (
        <CardFooter className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">
            {t('risingSign.result')}: {t(`labels.${risingSign.risingSign}`)}
          </h3>
          <p className="text-sm">{t(risingSign.explanation)}</p>

          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium">{t('risingSign.technicalDetails')}</h4>
            <ul className="text-xs text-gray-600 mt-1 space-y-1">
              <li>
                {t('risingSign.julianDate')}: {risingSign.technicalDetails.julianDate}
              </li>
              <li>
                {t('risingSign.gmst')}: {risingSign.technicalDetails.gmst}
              </li>
              <li>
                {t('risingSign.lst')}: {risingSign.technicalDetails.lst}
              </li>
              <li>
                {t('risingSign.ascendantLongitude')}: {risingSign.technicalDetails.ascendantLongitude}
              </li>
              <li>
                {t('risingSign.latitude')}: {risingSign.technicalDetails.latitude}
              </li>
              <li>
                {t('risingSign.longitude')}: {risingSign.technicalDetails.longitude}
              </li>
            </ul>
          </div>
          <>
            <Suspense fallback={<>Loading...</>}>
              <SignResult risingSign={risingSign.risingSign} />
            </Suspense>
            <Link
              className="w-full"
              href={`/${currentLocale}/blog/ascendant-sign-calculator-discover-your-rising-sign-instantly`}
            >
              <Button className="underline w-full" variant={'outline'}>
                {t('labels.risingDiscover')}
              </Button>
            </Link>
          </>
        </CardFooter>
      )}
    </Card>
  );
}
