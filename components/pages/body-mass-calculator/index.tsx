'use client';

import React, { useState } from 'react';
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
} from '@/lib/utils/calculate-bmi';
import { BMIGaugeChart } from './bm-gauge-chart';
import { LocaleType } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';

interface BMIState {
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  unitSystem: UnitSystem;
}

export default function BMICalculator({ currentLocale }: { currentLocale: LocaleType }) {
  const { t } = useTranslation(currentLocale, 'translation');
  const [bmiState, setBmiState] = useState<BMIState>({
    age: 25,
    gender: 'male',
    height: 170,
    weight: 70,
    unitSystem: 'metric',
  });

  const [result, setResult] = useState<BMIResult | null>(null);

  const formatNumber = (n: number) =>
    new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(n);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBmiState((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
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
    const { age, gender, height, weight, unitSystem } = bmiState;
    const calculationResult = calculateBMI(height, weight, age, gender, unitSystem);
    setResult(calculationResult);
  };

  const handleClear = () => {
    setBmiState({
      age: 25,
      gender: 'male',
      height: bmiState.unitSystem === 'metric' ? 170 : 67,
      weight: bmiState.unitSystem === 'metric' ? 70 : 154,
      unitSystem: bmiState.unitSystem,
    });
    setResult(null);
  };

  const getHeightUnit = () => {
    return bmiState.unitSystem === 'metric' ? 'cm' : 'in';
  };

  const getWeightUnit = () => {
    return bmiState.unitSystem === 'metric' ? 'kg' : 'lbs';
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{t('labels.bmi.calculator.title')}</CardTitle>
        <CardDescription>{t('labels.bmi.calculator.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="metric"
          value={bmiState.unitSystem}
          onValueChange={(value) => handleUnitChange(value as UnitSystem)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="us">{t('labels.bmi.calculator.usUnits')}</TabsTrigger>
            <TabsTrigger value="metric">{t('labels.bmi.calculator.metricUnits')}</TabsTrigger>
          </TabsList>
        </Tabs>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCalculate();
          }}
          className="space-y-4 mt-4"
        >
          <div className="space-y-2">
            <label htmlFor="age">{t('labels.bmi.calculator.age')}</label>
            <Input type="number" id="age" name="age" value={bmiState.age} onChange={handleInputChange} required />
            <div className="text-sm text-muted-foreground">{t('labels.bmi.calculator.ageHint')}</div>
          </div>

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
              <div className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
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
              <div className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
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
      </CardContent>

      {result && (
        <CardFooter className="flex flex-col">
          <div className="w-full">
            <div className="text-2xl font-bold text-center mb-4">{t('labels.bmi.calculator.result')}</div>

            <div
              className="text-xl font-semibold text-center mb-2"
              style={{ color: getCategoryColor(result.category) }}
            >
              {t('labels.bmi.gauge.title')
                .replace('{bmi}', result.bmi.toFixed(1)) // Ensure 1 decimal place
                .replace('{category}', result.category)}
            </div>
            <BMIGaugeChart result={result} currentLocale={currentLocale} />
            <ul className="space-y-2 mt-6 list-disc pl-2 md:pl-5 text-sm md:text-base">
              <li>
                {t('labels.bmi.calculator.healthyBmiRange')}: {result.healthyBmiRange}
              </li>
              <li>
                {t('labels.bmi.calculator.healthyWeightRange')}: {result.healthyWeightRange}
              </li>
              <li>
                {t('labels.bmi.calculator.bmiPrime')}: {formatNumber(result.bmiPrime)}
              </li>
              <li>
                {t('labels.bmi.calculator.ponderalIndex')}: {formatNumber(result.ponderalIndex)} kg/m<sup>3</sup>
              </li>
            </ul>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
