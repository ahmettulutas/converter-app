import {
  Ruler,
  Weight,
  Square,
  Compass,
  Sun,
  Percent,
  Home,
  Heart,
  Calculator,
  ScaleIcon as Scales,
  BookIcon,
  PersonStanding,
  Globe2,
} from 'lucide-react';

export const navCategories = [
  {
    category: 'converters',
    label: 'labels.converters',
    icon: Calculator,
    links: [
      { href: '/', label: 'labels.lengthCalculator', icon: Ruler },
      { href: '/weight-converter', label: 'labels.weightCalculator', icon: Weight },
      { href: '/square-calculator', label: 'labels.squareCalculator', icon: Square },
    ],
  },
  {
    category: 'astrology',
    label: 'labels.astrology',
    icon: Sun,
    links: [
      { href: '/rising-sign-calculator', label: 'labels.risingSignCalculator', icon: Compass },
      { href: '/sun-sign-calculator', label: 'labels.sunSignCalculator', icon: Sun },
      { href: '/birth-map-calculator', label: 'labels.birthMapCalculator', icon: Globe2 },
      { href: '/body-mass-index-calculator', label: 'labels.birthMapCalculator', icon: Globe2 },
    ],
  },
  {
    category: 'tools',
    label: 'labels.tools',
    icon: Scales,
    links: [
      { href: '/percentage-calculator', label: 'labels.percentageCalculator', icon: Percent },
      { href: '/mortgage-calculator', label: 'labels.mortgageCalculator', icon: Home },
      { href: '/sexual-identity-test', label: 'labels.sexualIdentityTest', icon: Heart },
      { href: '/body-mass-index-calculator', label: 'labels.bmi.calculator.title', icon: PersonStanding },
    ],
  },
  {
    category: 'content',
    label: 'labels.content',
    icon: BookIcon,
    links: [{ href: '/blog', label: 'labels.blog', icon: BookIcon }],
  },
];
export const staticPageUrls = [
  '/weight-converter',
  '',
  '/square-calculator',
  '/rising-sign-calculator',
  '/sun-sign-calculator',
  '/percentage-calculator',
  '/mortgage-calculator',
  '/sexual-identity-test',
  '/blog',
  '/birth-map-calculator',
  '/body-mass-index-calculator',
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
