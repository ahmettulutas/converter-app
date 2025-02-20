'use client';

import { lazy, Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

import { LocaleType } from '@/i18n/settings';

import { useTranslation } from '@/i18n/client';
import { RisingSignProps, calculateRisingSign } from '@/lib/utils/calculate-rising';
import { useParams, useSearchParams } from 'next/navigation';
import ComboboxSkeleton from '@/components/skeletons/combobox';

const CountryComboBox = lazy(() => import('./countries-selector'));
const CityComboBox = lazy(() => import('./cities-selector'));

export default function RisingSignCalculator({ currentLocale }: Readonly<{ currentLocale: LocaleType }>) {
  const [birthInfo, setBirthInfo] = useState<RisingSignProps>({
    birthDate: '',
    birthTime: '',
    longitude: 0,
    latitude: 0,
    country: '',
    city: '',
  });
  const [risingSign, setRisingSign] = useState<string | null>(null);
  const { t } = useTranslation(currentLocale, 'translation');
  const params = useParams();
  const sign = params?.sign;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBirthInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthInfo.birthDate || !birthInfo.birthTime || !birthInfo.city) {
      alert('Please fill out all required fields');
      return;
    }

    const calculatedSign = calculateRisingSign(birthInfo);
    setRisingSign(calculatedSign);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {sign ? (
            <p>
              {t('labels.welcome')} <span className="underline text-red-600">{t(`labels.${sign}`)}</span>
            </p>
          ) : (
            t('labels.risingSignCalculator')
          )}
        </CardTitle>
        <CardDescription>{t('labels.risignCardDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="birthDate">{t('labels.birthDate')}</label>
            <Input
              type="date"
              id="birthDate"
              name="birthDate"
              value={birthInfo.birthDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="birthTime">{t('labels.birthTime')}</label>
            <Input
              type="time"
              id="birthTime"
              name="birthTime"
              value={birthInfo.birthTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="country">{t('labels.country')}</label>
            <Suspense fallback={<ComboboxSkeleton />}>
              <CountryComboBox
                currentLocale={currentLocale}
                value={birthInfo.country}
                title={t('labels.selectCountry')}
                onChange={(selectedCountry) =>
                  setBirthInfo({
                    ...birthInfo,
                    country: selectedCountry,
                    city: '',
                    latitude: 0,
                    longitude: 0,
                  })
                }
              />
            </Suspense>
          </div>
          <div className="space-y-2">
            <label htmlFor="city">{t('labels.city')}</label>
            <Suspense fallback={<ComboboxSkeleton />}>
              <CityComboBox
                selectedCountry={birthInfo.country}
                selectedCity={birthInfo.city}
                title={t('labels.selectCity')}
                onChange={(selectedCity, latitude, longitude) =>
                  setBirthInfo((prev) => ({
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
            {t('labels.calculate')}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {risingSign && (
          <p className="text-center w-full font-semibold">
            {t('labels.risingResult')} :{' '}
            <span className="text-primary text-lg underline">{t(`labels.${risingSign}`)}</span>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
