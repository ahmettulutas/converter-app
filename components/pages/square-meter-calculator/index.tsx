'use client';
import { ComboBoxResponsive } from '@/components/shared/combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { areaUnits } from '@/lib/constants/units';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useTranslation } from '@/i18n/client';
import { calculateArea, formatNumberWithSeparator } from '@/lib/helpers';
import { Calculator } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { LocaleType } from '@/i18n/settings';

export default function SquareCalculator() {
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [inputUnit, setInputUnit] = useState('square_meters');
  const [outputUnit, setOutputUnit] = useState('square_meters');
  const [result, setResult] = useState<number | null>();
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');

  const handleCalculate = () => {
    const parsedWidth = parseFloat(width);
    const parsedLength = parseFloat(length);
    if (!isNaN(parsedWidth) && !isNaN(parsedLength)) {
      const result = calculateArea(parsedWidth, parsedLength, inputUnit, outputUnit);
      setResult(result);
    }
  };

  const translatedUnitOptions = useMemo(
    () =>
      areaUnits
        .map(({ value, label }) => ({
          value,
          label: t(`labels.units.${label}`),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [t]
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('labels.squareCalculator')}</CardTitle>
        <CardDescription>{t('metaData.squareCalculator.description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="w-full grid grid-cols-4 gap-2">
          <label htmlFor="width" className="col-span-4 text-sm">
            {t('labels.widthOfField')}
          </label>
          <Input
            type="number"
            name="width"
            autoFocus
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder={t('labels.widthPh')}
            className="col-span-2"
          />
          <ComboBoxResponsive
            triggerProps={{
              variant: 'outline',
              className: 'col-span-2 justify-between w-full overflow-hidden',
            }}
            value={inputUnit}
            title={t('labels.from')}
            data={translatedUnitOptions}
            handleChange={(e) => {
              setInputUnit(String(e));
              handleCalculate();
            }}
          />
        </div>
        <div className="w-full grid grid-cols-4 gap-2">
          <label htmlFor="length" className="col-span-4 text-sm">
            {t('labels.lengthOfField')}
          </label>
          <Input
            type="number"
            name="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder={t('labels.widthPh')}
            className="col-span-2"
          />
          <ComboBoxResponsive
            triggerProps={{
              variant: 'outline',
              className: 'col-span-2 justify-between w-full overflow-hidden',
            }}
            value={outputUnit}
            title={t('labels.to')}
            data={translatedUnitOptions}
            handleChange={(e) => {
              setOutputUnit(String(e));
              handleCalculate();
            }}
          />
        </div>
        <Button className="flex items-center space-y-2 text-md mt-4 w-full gap-4" onClick={handleCalculate}>
          <Calculator />
          {t('labels.calculate')}
        </Button>
      </CardContent>
      <CardFooter>
        {result ? (
          <h2 className="col-span-2 text-center text-lg md:text-2xl">{`${formatNumberWithSeparator(result)} ${t(
            `labels.units.${outputUnit}`
          )}`}</h2>
        ) : null}
      </CardFooter>
    </Card>
  );
}
