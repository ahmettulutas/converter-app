'use client';
import { ComboBoxResponsive, SelectType } from '@/components/shared/combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';
import { Rates, converter } from '@/lib/helpers';
import { ArrowLeftRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
type UnitValues<T extends readonly SelectType[]> = T[number]['value'];

type ConverterProps<T extends readonly SelectType[]> = {
  units: T;
  initialInputUnit: UnitValues<T>;
  initialOutputUnit: UnitValues<T>;
  rates: Rates;
  title: string | ReactNode;
  description: string | ReactNode;
};

const Converter = <T extends readonly SelectType[]>(props: ConverterProps<T>) => {
  const { units, initialInputUnit, initialOutputUnit, title, description, rates } = props;
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState(String(initialInputUnit));
  const [outputUnit, setOutputUnit] = useState(String(initialOutputUnit));
  const [outputValue, setOutputValue] = useState('');
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');
  const outputTranslated = t(`labels.units.${outputUnit}`);
  const translatedUnitOptions = units
    .map(({ value, label }) => ({
      value,
      label: t(`labels.units.${label}`),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const handleConvert = useCallback(() => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      const result = converter(value, inputUnit, outputUnit, rates);
      setOutputValue(String(result));
    }
  }, [inputUnit, inputValue, outputUnit, rates]);

  const handleSwap = () => {
    let prevInput = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(prevInput);
  };

  useEffect(() => {
    handleConvert();
  }, [inputUnit, outputUnit, inputValue, handleConvert]);

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
            <div className="grid gap-2">
              <ComboBoxResponsive
                triggerProps={{
                  variant: 'outline',
                  className: 'justify-between w-full',
                }}
                value={inputUnit}
                title={t('labels.from')}
                data={translatedUnitOptions}
                handleChange={(e) => {
                  setInputUnit(String(e));
                  handleConvert();
                }}
              />
              <Input
                type="number"
                autoFocus
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleConvert();
                }}
                placeholder={t('labels.typeUnit')}
              />
            </div>
            <div className="flex items-center justify-center">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSwap}>
                <ArrowLeftRight className="h-4 w-4" />
                <span className="sr-only">Switch units</span>
              </Button>
            </div>
            <div className="grid gap-2">
              <ComboBoxResponsive
                triggerProps={{
                  variant: 'outline',
                  className: 'justify-between w-full',
                }}
                value={outputUnit}
                title={t('labels.result')}
                data={translatedUnitOptions}
                handleChange={(e) => {
                  setOutputUnit(String(e));
                  handleConvert();
                }}
              />

              <Input
                type="number"
                defaultValue={outputValue}
                placeholder={t('labels.result')}
                disabled
                className="disabled:opacity-100 disabled:cursor-default"
              />
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {inputValue ? (
              <h2 className="text-center text-lg font-semibold">{`${inputValue} ${t(
                `labels.units.${inputUnit}`
              )} = ${Number(outputValue).toFixed(2)} ${outputTranslated}`}</h2>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default Converter;
