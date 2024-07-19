import { Rates } from '@/lib/helpers';

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
