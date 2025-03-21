'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  calculatePercentage,
  calculateValueFromPercentage,
  calculateTotalFromPercentage,
  calculatePercentageChange,
  increaseByPercentage,
  decreaseByPercentage,
  CalculationType,
  getPercentageDescription,
  percentTypes,
} from '@/lib/utils/calculate-percentage';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';

interface CalculationState {
  type: CalculationType;
  value: string;
  total: string;
  percentage: string;
  result: string;
}

export default function PercentageCalculator(
  props: Readonly<{ currentLocale: LocaleType } & { initialType?: CalculationType }>
) {
  const { currentLocale, initialType } = props;
  const [calculationState, setCalculationState] = useState<CalculationState>({
    type: initialType ?? 'valueFromPercentage',
    value: '',
    total: '',
    percentage: '',
    result: '',
  });
  const { t } = useTranslation(currentLocale, 'translation');
  const description = t(getPercentageDescription(calculationState.type));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalculationState((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: CalculationType) => {
    setCalculationState((prev) => ({ ...prev, type: value, result: '' }));
  };

  const handleCalculate = () => {
    const { type, value, total, percentage } = calculationState;
    let result = '';

    switch (type) {
      case 'valueFromPercentage':
        result = calculateValueFromPercentage(Number(percentage), Number(total)).toFixed(2);
        break;
      case 'percentageFromTotal':
        result = calculatePercentage(Number(value), Number(total)).toFixed(2) + '%';
        break;
      case 'totalFromPercentage':
        result = calculateTotalFromPercentage(Number(value), Number(percentage)).toFixed(2);
        break;
      case 'percentageChange':
        result = calculatePercentageChange(Number(value), Number(total)).toFixed(2) + '%';
        break;
      case 'increaseByPercentage':
        result = increaseByPercentage(Number(value), Number(percentage)).toFixed(2);
        break;
      case 'decreaseByPercentage':
        result = decreaseByPercentage(Number(value), Number(percentage)).toFixed(2);
        break;
    }

    setCalculationState((prev) => ({ ...prev, result }));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle>
          {initialType
            ? t(`labels.dynamicPercentTitles.${initialType}`)
            : t('labels.dynamicPercentTitles.valueFromPercentage')}
        </CardTitle>
        <CardDescription>{t('labels.percentageCardDesc')}</CardDescription>
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
            <label htmlFor="type">{t('labels.calculationType')}</label>
            <Select onValueChange={handleTypeChange} value={calculationState.type}>
              <SelectTrigger>
                <SelectValue placeholder={t('labels.selectCalculationType')} />
              </SelectTrigger>
              <SelectContent>
                {percentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t(`labels.${type}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="bg-secondary p-4 rounded-md">
            <h3 className="font-semibold mb-2">{t('labels.description')}</h3>
            <p>{description}</p>
          </div>
          {(calculationState.type === 'valueFromPercentage' ||
            calculationState.type === 'percentageFromTotal' ||
            calculationState.type === 'percentageChange') && (
            <div className="space-y-2">
              <label htmlFor="total">{t('labels.total')}</label>
              <Input
                type="number"
                id="total"
                name="total"
                value={calculationState.total}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          {calculationState.type !== 'valueFromPercentage' && (
            <div className="space-y-2">
              <label htmlFor="value">{t('labels.value')}</label>
              <Input
                type="number"
                id="value"
                name="value"
                value={calculationState.value}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          {(calculationState.type === 'valueFromPercentage' ||
            calculationState.type === 'totalFromPercentage' ||
            calculationState.type === 'increaseByPercentage' ||
            calculationState.type === 'decreaseByPercentage') && (
            <div className="space-y-2">
              <label htmlFor="percentage">{t('labels.percentage')}</label>
              <Input
                type="number"
                id="percentage"
                name="percentage"
                value={calculationState.percentage}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <Button type="submit" className="w-full">
            {t('labels.calculate')}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {calculationState.result && (
          <p className="text-center w-full text-lg font-semibold">
            {t('labels.result')}: <span className="text-primary">{calculationState.result}</span>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
