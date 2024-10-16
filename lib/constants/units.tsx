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

export const lengthUnits = [
  { value: 'millimeters', label: 'millimeters' },
  { value: 'centimeters', label: 'centimeters' },
  { value: 'decimeters', label: 'decimeters' },
  { value: 'meters', label: 'meters' },
  { value: 'kilometers', label: 'kilometers' },
  { value: 'miles', label: 'miles' },
  { value: 'feet', label: 'feet' },
  { value: 'inches', label: 'inches' },
  { value: 'yards', label: 'yards' },
] as const;

export const lengthRates: Rates = {
  millimeters: 1000,
  centimeters: 100,
  decimeters: 10,
  meters: 1,
  kilometers: 0.001,
  miles: 0.000621371,
  feet: 3.28084,
  inches: 39.3701,
  yards: 1.09361,
};

export const areaUnits = [
  { value: 'square_millimeters', label: 'square_millimeters' },
  { value: 'square_centimeters', label: 'square_centimeters' },
  { value: 'square_decimeters', label: 'square_decimeters' },
  { value: 'square_meters', label: 'square_meters' },
  { value: 'square_kilometers', label: 'square_kilometers' },
  { value: 'acres', label: 'acres' },
  { value: 'hectares', label: 'hectares' },
  { value: 'square_miles', label: 'square_miles' },
  { value: 'square_feet', label: 'square_feet' },
  { value: 'square_inches', label: 'square_inches' },
  { value: 'square_yards', label: 'square_yards' },
  { value: 'donum', label: 'donum' },
] as const;

export const areaRates: Rates = {
  square_millimeters: 1e6,
  square_centimeters: 1e4,
  square_decimeters: 1e2,
  square_meters: 1,
  square_kilometers: 1e-6,
  acres: 0.000247105,
  hectares: 0.0001,
  square_miles: 3.861e-7,
  square_feet: 10.7639,
  square_inches: 1550,
  square_yards: 1.19599,
  donum: 0.001,
};
