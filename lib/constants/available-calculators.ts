export const availableCalculators = [
  'square-calculator',
  'body-mass-calculator',
  'sexual-calculator',
  'sun-sign-calculator',
  'rising-sign-calculator',
  'percentage-calculator',
] as const;
export type AvailableCalculatorType = (typeof availableCalculators)[number];
