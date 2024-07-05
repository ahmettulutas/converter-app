export const conversionRates: Record<string, number> = {
  meters: 1,
  kilometers: 0.001,
  miles: 0.000621371,
  feet: 3.28084,
  inches: 39.3701,
};

export const convertLength = (
  value: number,
  fromUnit: string,
  toUnit: string
) => {
  const inMeters = value / conversionRates[fromUnit];
  return inMeters * conversionRates[toUnit];
};
