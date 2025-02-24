// components/CountryComboBox.tsx

import { ComboBoxResponsive } from '@/components/shared/combobox';
import { LocaleType } from '@/i18n/settings';
import { countriesData } from '@/lib/constants/countries-data';
import React, { memo, useMemo } from 'react';

type CountryComboBoxProps = {
  value: string;
  title: string;
  onChange: (value: string) => void;
  currentLocale: LocaleType;
};

const CountryComboBox: React.FC<CountryComboBoxProps> = ({ value, title, onChange, currentLocale }) => {
  const memoizedCountryData = useMemo(() => {
    return countriesData[currentLocale === 'de' ? 'de' : 'en']?.map((country) => ({
      value: String(country.value),
      label: country.label,
    }));
  }, [currentLocale]);
  return (
    <ComboBoxResponsive
      triggerProps={{
        variant: 'outline',
        className: 'col-span-2 justify-between w-full overflow-hidden',
      }}
      value={value}
      title={title}
      data={memoizedCountryData}
      handleChange={(e) => onChange(String(e))}
    />
  );
};

export default memo(CountryComboBox);
