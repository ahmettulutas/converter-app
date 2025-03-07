'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  calculateBMI,
  type UnitSystem,
  type Gender,
  type BMIResult,
  getCategoryColor,
  BMIState,
} from '@/lib/utils/calculate-bmi';

import { LocaleType } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';
const BMIGaugeChart = lazy(() => import('./bm-gauge-chart'));

export default function BMICalculator({ currentLocale }: { currentLocale: LocaleType }) {
  const { t } = useTranslation(currentLocale, 'translation');
  const [bmiState, setBmiState] = useState<BMIState>({
    gender: 'male',
    height: 170,
    weight: 70,
    unitSystem: 'metric',
  });

  const [result, setResult] = useState<BMIResult | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true);

  const formatNumber = (n: number) =>
    new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(n);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBmiState((prev) => ({
      ...prev,
      [name]: parseFloat(value) || '',
    }));
  };

  const handleGenderChange = (value: Gender) => {
    setBmiState((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleUnitChange = (value: UnitSystem) => {
    let newHeight = bmiState.height;
    let newWeight = bmiState.weight;

    if (value === 'metric' && bmiState.unitSystem === 'us') {
      newHeight = Math.round(bmiState.height * 2.54);
      newWeight = Math.round(bmiState.weight * 0.453592);
    } else if (value === 'us' && bmiState.unitSystem === 'metric') {
      newHeight = Math.round(bmiState.height / 2.54);
      newWeight = Math.round(bmiState.weight / 0.453592);
    }

    setBmiState((prev) => ({
      ...prev,
      unitSystem: value,
      height: newHeight,
      weight: newWeight,
    }));
  };

  const handleCalculate = () => {
    const { gender, height, weight, unitSystem } = bmiState;
    const calculationResult = calculateBMI(height, weight, gender, unitSystem);
    setResult(calculationResult);
    setShowForm(false);
  };

  const handleRecalculate = () => {
    setShowForm(true);
  };

  const handleClear = () => {
    setBmiState({
      gender: 'male',
      height: bmiState.unitSystem === 'metric' ? 170 : 67,
      weight: bmiState.unitSystem === 'metric' ? 70 : 154,
      unitSystem: bmiState.unitSystem,
    });
    setResult(null);
    setShowForm(true);
  };

  const getHeightUnit = () => {
    return bmiState.unitSystem === 'metric' ? 'cm' : 'in';
  };

  const getWeightUnit = () => {
    return bmiState.unitSystem === 'metric' ? 'kg' : 'lbs';
  };

  return (
    <Card className="max-w-lg mx-auto bg-background">
      <CardHeader>
        <CardTitle>{t('labels.bmi.page.cardTitle')}</CardTitle>
        <CardDescription>{t('labels.bmi.page.description')}</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        {result ? (
          <div>
            <div className="text-2xl font-bold text-center mb-4">{t('labels.bmi.calculator.result')}</div>

            <div
              className="text-xl font-semibold text-center mb-2"
              style={{ color: getCategoryColor(result.category) }}
            >
              {t('labels.bmi.gauge.title')
                .replace('{bmi}', result.bmi.toFixed(1))
                .replace('{category}', result.category)}
            </div>
            <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
              <BMIGaugeChart result={result} currentLocale={currentLocale} />
            </Suspense>
            <ul className="space-y-2 mt-6 list-disc pl-2 md:pl-5 text-sm md:text-base">
              <li>
                {t('labels.bmi.calculator.healthyBmiRange')}:{' '}
                <span className="font-bold">{result.healthyBmiRange}</span>
              </li>
              <li>
                {t('labels.bmi.calculator.healthyWeightRange')}:{' '}
                <span className="font-bold">{result.healthyWeightRange}</span>
              </li>
              <li>
                {t('labels.bmi.calculator.bmiPrime')}:{' '}
                <span className="font-bold">{formatNumber(result.bmiPrime)}</span>
              </li>
              <li>
                {t('labels.bmi.calculator.ponderalIndex')}:{' '}
                <span className="font-bold">
                  {formatNumber(result.ponderalIndex)} kg/m<sup>3</sup>
                </span>
              </li>
            </ul>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button onClick={handleRecalculate} className="w-full">
                {t('labels.bmi.calculator.recalculate') || 'Recalculate'}
              </Button>
              <Button variant="secondary" onClick={handleClear} className="w-full">
                {t('labels.bmi.calculator.clear')}
              </Button>
            </div>
          </div>
        ) : (
          <Tabs
            defaultValue="metric"
            value={bmiState.unitSystem}
            onValueChange={(value) => handleUnitChange(value as UnitSystem)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="us">{t('labels.bmi.calculator.usUnits')}</TabsTrigger>
              <TabsTrigger value="metric">{t('labels.bmi.calculator.metricUnits')}</TabsTrigger>
            </TabsList>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCalculate();
              }}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <label>{t('labels.bmi.calculator.gender')}</label>
                <RadioGroup value={bmiState.gender} onValueChange={handleGenderChange} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">{t('labels.bmi.calculator.male')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">{t('labels.bmi.calculator.female')}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <label htmlFor="height">{t('labels.bmi.calculator.height')}</label>
                <div className="relative">
                  <Input
                    type="number"
                    id="height"
                    name="height"
                    value={bmiState.height}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="absolute inset-y-2 my-auto right-3 flex items-center text-sm text-muted-foreground bg-background z-10">
                    {getHeightUnit()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="weight">{t('labels.bmi.calculator.weight')}</label>
                <div className="relative">
                  <Input
                    type="number"
                    id="weight"
                    name="weight"
                    value={bmiState.weight}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="absolute inset-y-2 my-auto right-3 flex items-center text-sm text-muted-foreground bg-background z-10">
                    {getWeightUnit()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="submit" className="w-full">
                  {t('labels.bmi.calculator.calculate')}
                </Button>
                <Button type="button" variant="secondary" className="w-full" onClick={handleClear}>
                  {t('labels.bmi.calculator.clear')}
                </Button>
              </div>
            </form>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
