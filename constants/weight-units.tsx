import { Rates } from '@/lib/helpers';

export const weightUnits = [
  { value: 'miligrams', label: 'miligrams' },
  { value: 'centigrams', label: 'centigrams' },
  { value: 'decigrams', label: 'decigrams' },
  { value: 'grams', label: 'grams' },
  { value: 'kilograms', label: 'kilograms' },
  { value: 'pounds', label: 'pounds' },
  { value: 'ounces', label: 'ounces' },
] as const;

export const weightRates: Rates = {
  miligrams: 0.001,
  centigrams: 0.01,
  decigrams: 0.1,
  grams: 1,
  kilograms: 0.001,
  pounds: 0.00220462,
  ounces: 0.03527396,
};
