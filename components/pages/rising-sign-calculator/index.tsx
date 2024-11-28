'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ComboBoxResponsive } from '@/components/shared/combobox';
import { countriesData } from '@/lib/constants/countries-data';
import { LocaleType } from '@/i18n/settings';
import { citiesData } from '@/lib/constants/cities-data';

import { useTranslation } from '@/i18n/client';
import { RisingSignProps, calculateRisingSign } from '@/lib/utils/calculate-rising';

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

  const memoizedCountryData = countriesData.map((country) => ({
    value: String(country.id),
    label: country.translations[currentLocale] ?? country.translations.en,
  }));

  const memoizedCityData = birthInfo.country
    ? citiesData?.[String(birthInfo.country) as keyof typeof citiesData]?.map((item) => ({
        value: item.id,
        label: item.name,
        longitude: item.longitude,
        latitude: item.latitude,
      }))
    : [];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('labels.risingSignCalculator')}</CardTitle>
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
            <ComboBoxResponsive
              triggerProps={{
                variant: 'outline',
                className: 'col-span-2 justify-between w-full overflow-hidden',
              }}
              value={birthInfo.country}
              title={t('labels.selectCountry')}
              data={memoizedCountryData}
              handleChange={(e) =>
                setBirthInfo({ ...birthInfo, country: String(e), city: '', latitude: 0, longitude: 0 })
              }
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="city">{t('labels.city')}</label>
            <ComboBoxResponsive
              triggerProps={{
                variant: 'outline',
                className: 'col-span-2 justify-between w-full overflow-hidden',
                disabled: !birthInfo.country,
              }}
              value={Number(birthInfo.city)}
              title={t('labels.selectCity')}
              data={memoizedCityData}
              handleChange={(e) => {
                const selectedCity = memoizedCityData.find((city) => city.value === e);
                if (selectedCity) {
                  setBirthInfo((prev) => ({
                    ...prev,
                    city: String(e),
                    longitude: Number(selectedCity.longitude),
                    latitude: Number(selectedCity.latitude),
                  }));
                }
              }}
            />
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
