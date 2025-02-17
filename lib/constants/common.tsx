export const staticPageUrls = [
  '/weight-converter',
  '',
  '/square-calculator',
  '/rising-sign-calculator',
  '/sun-sign-calculator',
  '/percentage-calculator',
  '/mortgage-calculator',
  '/sexual-identity-test',
];

export const navLinks = [
  { href: '/', label: 'lengthCalculator' },
  { href: '/weight-converter', label: 'weightCalculator' },
  { href: '/square-calculator', label: 'squareCalculator' },
  { href: '/rising-sign-calculator', label: 'risingSignCalculator' },
  { href: '/sun-sign-calculator', label: 'sunSignCalculator' },
  { href: '/percentage-calculator', label: 'percentageCalculator' },
  { href: '/mortgage-calculator', label: 'mortgageCalculator' },
  { href: '/sexual-identity-test', label: 'sexualIdentityTest' },
];
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
export const ogImageSizes = [
  { width: 1200, height: 630 }, // Standard OG size
  { width: 1600, height: 840 }, // High-res option
  { width: 800, height: 419 }, // Smaller fallback
];
export const twitterImageSizes = [
  { width: 800, height: 419 }, // Rounded for correct aspect ratio
  { width: 1600, height: 840 }, // Adjusted for 1.91:1
  { width: 1200, height: 630 }, // Best practice
];

export const companyName = 'EqualtoWhat';
