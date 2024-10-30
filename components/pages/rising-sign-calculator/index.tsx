'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ComboBoxResponsive } from '@/components/shared/combobox';
import { countriesData } from '@/lib/constants/countries-data';
import { LocaleType } from '@/i18n/settings';
import { citiesData } from '@/lib/constants/cities-data';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/i18n/client';

type RisingSignProps = {
  birthDate: string;
  birthTime: string;
  longitude: number;
  latitude: number;
  country: string;
  city: string;
};

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

// Rising sign calculation logic
const calculateRisingSign = ({ birthDate, birthTime, latitude, longitude }: RisingSignProps): string => {
  const date = new Date(`${birthDate}T${birthTime}`);

  // Ensure valid birth date and time
  if (isNaN(date.getTime())) return 'Invalid birth date or time';

  const julianDate = date.getTime() / 86400000 + 2440587.5; // Julian date

  // Calculate Julian centuries since J2000.0
  const century = (julianDate - 2451545) / 36525;

  // Calculate Greenwich Sidereal Time (GST) in degrees
  let siderealTime =
    (100.46061837 +
      36000.770053608 * century +
      0.000387933 * century * century -
      (century * century * century) / 38710000) %
    360;

  // Adjust sidereal time for observer's longitude (in degrees)
  siderealTime = (siderealTime + longitude) % 360;

  // Calculate Local Sidereal Time (LST)
  const lstHours = (siderealTime / 15 + date.getUTCHours() + date.getUTCMinutes() / 60) % 24;

  // Calculate the ascendant in degrees (360 degrees divided into 12 zodiac signs)
  const ascendant = (lstHours * 15 + latitude) % 360;

  // Each zodiac sign covers 30 degrees, so divide ascendant by 30 to get sign index
  const signIndex = Math.floor(ascendant / 30);

  // Return corresponding zodiac sign
  return zodiacSigns[signIndex];
};

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
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');

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
            Calculate Rising Sign
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {risingSign && (
          <p className="text-center w-full text-lg font-semibold">
            Your rising sign is: <span className="text-primary">{risingSign}</span>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
