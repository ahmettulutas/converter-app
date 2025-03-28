'use client';

import { lazy, Suspense, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { calculateSunSign } from '@/lib/utils/calculate-sun-sign';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface SunSignProps {
  birthDate: string;
  birthHour: string;
}
const SignResult = lazy(() => import('../rising-sign-calculator/result'));

export default function SunSignCalculator({ currentLocale }: Readonly<{ currentLocale: LocaleType }>) {
  const [birthInfo, setBirthInfo] = useState<SunSignProps>({
    birthDate: '',
    birthHour: '',
  });
  const [sunSign, setSunSign] = useState<string | null>(null);

  const params = useParams();
  const { t } = useTranslation(currentLocale, 'translation');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBirthInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthInfo.birthDate || !birthInfo.birthHour) {
      alert('Please enter both your birth date and birth hour');
      return;
    }

    const calculatedSign = calculateSunSign(birthInfo.birthDate, birthInfo.birthHour);
    setSunSign(calculatedSign);
  };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('labels.sunSignCalculator')}</CardTitle>
        <CardDescription>{t('labels.sunSignCardDesc')}</CardDescription>
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
            <label htmlFor="birthHour">{t('labels.birthTime')}</label>
            <Input
              type="time"
              id="birthHour"
              name="birthHour"
              value={birthInfo.birthHour}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {t('labels.calculate')}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-y-2">
        {sunSign && (
          <>
            <Suspense fallback={<>Loading...</>}>
              <SignResult risingSign={sunSign} />
            </Suspense>
            <Link href={`/${params.locale}/blog/sun-sign-calculator-discover-your-zodiac-sign-instantly`}>
              <Button className="underline" variant={'outline'}>
                {t('labels.risingDiscover')}
              </Button>
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
