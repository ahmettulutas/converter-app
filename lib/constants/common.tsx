export const staticPageUrls = [
  '/weight-converter',
  '',
  '/square-calculator',
  '/risign-sign-calculator',
  '/sun-sign-calculator',
]; // empty string is for index page.
export const navLinks = [
  { href: '/', label: 'lengthCalculator' },
  { href: '/weight-converter', label: 'weightCalculator' },
  { href: '/square-calculator', label: 'squareCalculator' },
  { href: '/risign-sign-calculator', label: 'risingSignCalculator' },
  { href: '/sun-sign-calculator', label: 'sunSignCalculator' },
];
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
export const ogImageSizes = [
  { width: 800, height: 600 },
  { width: 1800, height: 1600 },
];
export const twitterImageSizes = [
  { width: 800, height: 418 },
  { width: 1600, height: 900 },
];

export const companyName = 'EqualtoWhat';
