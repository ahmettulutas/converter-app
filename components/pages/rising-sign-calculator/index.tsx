'use client';

import { lazy, Suspense, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';
import { useParams } from 'next/navigation';
import { calculateAscendant, RisingSignResult } from '@/lib/utils/calculate-rising';
import ComboboxSkeleton from '@/components/skeletons/combobox';
import Link from 'next/link';

const CountryComboBox = lazy(() => import('../../shared/countries-selector'));
const CityComboBox = lazy(() => import('../../shared/cities-selector'));
const SignResult = lazy(() => import('./result'));

export default function RisingSignCalculator({ currentLocale }: { currentLocale: LocaleType }) {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [risingSign, setRisingSign] = useState<RisingSignResult | null>(null);
  const [error, setError] = useState('');

  const { t } = useTranslation(currentLocale, 'translation');
  const params = useParams();
  const sign = params?.sign;

  const handleCalculate = () => {
    const { result, error } = calculateAscendant(birthDate, birthTime, latitude, longitude);
    if (error) {
      setError(t(`msg.${error}`));
      setRisingSign(null);
    } else {
      setError('');
      setRisingSign(result);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>
          {sign ? (
            <p>
              {t('labels.welcome')} <span className="underline text-red-600">{t(`labels.${sign}`)}</span>
            </p>
          ) : (
            t('risingSign.title')
          )}
        </CardTitle>
        <CardDescription>{t('risingSign.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthDate">{t('labels.birthDate')}</Label>
            <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthTime">{t('labels.birthTime')}</Label>
            <Input id="birthTime" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">{t('labels.country')}</Label>
              <Suspense fallback={<ComboboxSkeleton />}>
                <CountryComboBox
                  currentLocale={currentLocale}
                  value={selectedCountry}
                  title={t('labels.selectCountry')}
                  onChange={(selectedCountry) => {
                    setSelectedCountry(selectedCountry);
                    setLongitude('');
                    setLatitude('');
                  }}
                />
              </Suspense>
            </div>

            <div className="space-y-2">
              <label htmlFor="city">{t('labels.city')}</label>
              <Suspense fallback={<ComboboxSkeleton />}>
                <CityComboBox
                  selectedCountry={selectedCountry}
                  selectedCity={selectedCity}
                  title={t('labels.selectCity')}
                  onChange={(selectedCity, latitude, longitude) => {
                    setSelectedCity(selectedCity);
                    setLongitude(String(longitude));
                    setLatitude(String(latitude));
                  }}
                />
              </Suspense>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      </CardContent>

      {risingSign && (
        <CardFooter className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">
            {t('risingSign.result')}: {risingSign.position}
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
              <SignResult risingSign={`${t('risingSign.result')}: ${risingSign.position}`} />
            </Suspense>
            <Link
              className="w-full"
              href={`/${params.locale}/blog/ascendant-sign-calculator-discover-your-rising-sign-instantly`}
            >
              <Button className="underline w-full" variant={'outline'}>
                {t('labels.risingDiscover')}
              </Button>
            </Link>
          </>
        </CardFooter>
      )}

      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleCalculate}>
          {t('risingSign.calculate')}
        </Button>
      </CardFooter>
    </Card>
  );
}
