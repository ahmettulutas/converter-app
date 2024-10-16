'use client';
import { ComboBoxResponsive, SelectType } from '@/components/shared/combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';
import { Rates, converter } from '@/lib/helpers';
import { ArrowLeftRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type UnitValues<T extends readonly SelectType[]> = T[number]['value'];

type ConverterProps<T extends readonly SelectType[]> = {
  units: T;
  initialInputUnit: UnitValues<T>;
  initialOutputUnit: UnitValues<T>;
  rates: Rates;
};

export const Converter = <T extends readonly SelectType[]>(props: ConverterProps<T>) => {
  const { units, initialInputUnit, initialOutputUnit, rates } = props;
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState(String(initialInputUnit));
  const [outputUnit, setOutputUnit] = useState(String(initialOutputUnit));
  const [outputValue, setOutputValue] = useState('');
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');

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

  const translatedUnitOptions = useMemo(
    () =>
      units
        .map(({ value, label }) => ({
          value,
          label: t(`labels.units.${label}`),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [t, units]
  );
  const outputTranslated = t(`labels.units.${outputUnit}`);
  return (
    <section className="grid grid-cols-2 gap-4 w-full max-w-[450px]">
      <div className="w-full col-span-2 flex gap-2">
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
        <Button onClick={handleSwap}>
          <ArrowLeftRight width={16} height={16} />
        </Button>

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
      </div>
      <Input
        type="number"
        autoFocus
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleConvert();
        }}
        placeholder={t('labels.typeUnit')}
        className="col-span-2 md:col-span-1"
      />
      <Input
        type="number"
        defaultValue={outputValue}
        placeholder={t('labels.result')}
        disabled
        className="col-span-2 md:col-span-1 disabled:opacity-100 bg-gray-100 disabled:cursor-default"
      />
      {inputValue ? (
        <h2 className="col-span-2 text-center text-lg font-semibold">{`${inputValue} ${t(
          `labels.units.${inputUnit}`
        )} = ${outputValue} ${outputTranslated}`}</h2>
      ) : null}
    </section>
  );
};
