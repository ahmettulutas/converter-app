'use client';
import { ComboBoxResponsive } from '@/components/shared/combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { areaUnits } from '@/constants/units';

import { useTranslation } from '@/i18n/client';
import { calculateArea, formatNumberWithSeparator } from '@/lib/helpers';
import { Calculator } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';

export const SquareCalculator = () => {
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [inputUnit, setInputUnit] = useState('square_meters');
  const [outputUnit, setOutputUnit] = useState('square_meters');
  const [result, setResult] = useState<number | null>();
  const params = useParams();
  const { t } = useTranslation(params.locale as string, 'translation');

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
    <section className="flex flex-col gap-4 w-full max-w-[950px]">
      <div className="w-full grid grid-cols-4 gap-2 flex-col">
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
      <div className="w-full grid grid-cols-4 gap-2 flex-col">
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
      <Button className="flex items-center gap-2 text-md" onClick={handleCalculate}>
        <Calculator />
        {t('labels.calculate')}
      </Button>
      {result ? (
        <h2 className="col-span-2 text-center text-lg md:text-2xl">{`${formatNumberWithSeparator(result)} ${t(
          `labels.units.${outputUnit}`
        )}`}</h2>
      ) : null}
    </section>
  );
};
