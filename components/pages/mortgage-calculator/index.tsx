'use client';

import React, { useState } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { calculateMortgage } from '@/lib/utils/calculate-mortgage';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';

interface MortgageState {
  principal: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: 'monthly' | 'biweekly';
}

export default function MortgageCalculator({ currentLocale }: Readonly<{ currentLocale: LocaleType }>) {
  const [mortgageState, setMortgageState] = useState<MortgageState>({
    principal: 200000,
    interestRate: 5,
    loanTerm: 30,
    paymentFrequency: 'monthly',
  });
  const [result, setResult] = useState<{ payment: number; totalInterest: number; totalPayment: number } | null>(null);

  const { t } = useTranslation(currentLocale, 'translation');

  const formatNumber = (n: number) =>
    new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMortgageState((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSelectChange = (value: 'monthly' | 'biweekly') => {
    setMortgageState((prev) => ({ ...prev, paymentFrequency: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setMortgageState((prev) => ({ ...prev, interestRate: value[0] }));
  };

  const handleCalculate = () => {
    const { principal, interestRate, loanTerm, paymentFrequency } = mortgageState;
    const calculationResult = calculateMortgage(principal, interestRate, loanTerm, paymentFrequency);
    setResult(calculationResult);
  };

  return (
    <Card className="max-w-lg mx-auto shadow-md">
      <CardHeader>
        <CardTitle>{t('labels.mortgageCalculator')}</CardTitle>
        <CardDescription>{t('labels.mortgageCalculatorDesc')}</CardDescription>
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
            <label htmlFor="principal">{t('labels.principal')}</label>
            <Input
              type="number"
              id="principal"
              name="principal"
              value={mortgageState.principal}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="interestRate">{t('labels.interestRate')}</label>
            <Slider
              min={0}
              max={20}
              step={0.1}
              value={[mortgageState.interestRate]}
              onValueChange={handleSliderChange}
            />
            <div className="text-right">{mortgageState.interestRate.toFixed(1)}%</div>
          </div>
          <div className="space-y-2">
            <label htmlFor="loanTerm">{t('labels.loanTerm')}</label>
            <Input
              type="number"
              id="loanTerm"
              name="loanTerm"
              value={mortgageState.loanTerm}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="paymentFrequency">{t('labels.paymentFrequency')}</label>
            <Select onValueChange={handleSelectChange} value={mortgageState.paymentFrequency}>
              <SelectTrigger>
                <SelectValue placeholder={t('labels.selectPaymentFrequency')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">{t('labels.monthly')}</SelectItem>
                <SelectItem value="biweekly">{t('labels.biweekly')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            {t('labels.calculate')}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {result && (
          <div className="w-full space-y-2">
            <p className="font-semibold">
              {t('labels.payment')}: <span className="text-primary">{formatNumber(result.payment)}</span>
            </p>
            <p className="font-semibold">
              {t('labels.totalInterest')}: <span className="text-primary">{formatNumber(result.totalInterest)}</span>
            </p>
            <p className="font-semibold">
              {t('labels.totalPayment')}: <span className="text-primary">{formatNumber(result.totalPayment)}</span>
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
