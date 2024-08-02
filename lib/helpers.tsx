import { areaRates } from '@/constants/units';
import { availableLocales, defaultLanguage } from '@/i18n/settings';

export type Rates = Record<string, number>;
export const converter = (value: number, fromUnit: string, toUnit: string, conversionRates: Rates) => {
  const converted = value / conversionRates[fromUnit];
  return converted * conversionRates[toUnit];
};

export const calculateArea = (width: number, length: number, inputUnit: string, outputUnit: string) => {
  const areaInSquareMeters = width * length * (areaRates[inputUnit] || 1);
  const result = areaInSquareMeters / (areaRates[outputUnit] || 1);
  return result;
};

export const omitLocaleFromPath = (path: string): string => {
  if (!path) return '';
  const splittedPath = path.split('/').filter((item) => !!item);
  const isFirstSegmentLocale = availableLocales.includes(splittedPath[0]);
  if (splittedPath.length === 1 && (isFirstSegmentLocale || defaultLanguage === splittedPath[0])) {
    return '';
  }
  const startIdx = isFirstSegmentLocale ? 1 : 0;
  return splittedPath.slice(startIdx).join('/');
};

export function formatNumberWithSeparator(number: number): string {
  if (isNaN(number) || number === null) {
    return '';
  }
  const formatter = new Intl.NumberFormat('de-DE'); // German locale uses periods for thousands separators
  return formatter.format(number);
}
