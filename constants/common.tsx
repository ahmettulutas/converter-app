export const staticPageUrls = ['/weight-converter', '']; // empty string is for index page.
export const navLinks = [
  { href: '/', label: 'home' },
  { href: 'weight-converter', label: 'weightHeader' },
  { href: 'square-calculator', label: 'squareHeader' },
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
