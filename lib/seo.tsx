import { createTranslation } from '@/i18n';
import { LocaleType, availableLocales, defaultLanguage } from '@/i18n/settings';
import { Metadata, ResolvingMetadata } from 'next';
import opengraphImage from '../public/icon.svg';
import { baseUrl, companyName, navLinks, ogImageSizes, twitterImageSizes } from '@/lib/constants/common';

export const generateLocalesForMetaData = (languages: typeof availableLocales) => {
  const locales: Record<string, string> = {};
  for (const key of languages) {
    locales[key] = key;
  }
  return locales;
};

type GenerateMetaImageProps = {
  sizes: Array<{ width: number; height: number }>;
  staticImage?: { url: string | URL; alt?: string };
};

export const generateMetaImages = ({ sizes, staticImage }: GenerateMetaImageProps): Array<any> => {
  if (!staticImage?.url) return [];
  const metaImages = [];
  for (let { width, height } of sizes) {
    metaImages.push({
      width,
      height,
      alt: staticImage?.alt ?? '',
      url: staticImage.url,
    });
  }
  return metaImages;
};

export const getDefaultMetaData = async (
  locale: LocaleType,
  parent: ResolvingMetadata,
  pageKey: string
): Promise<Metadata> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await createTranslation(locale, 'translation'); // This is not actually a hook, so I intentionally ignored it here.
  const previousImages = (await parent).openGraph?.images || [];
  const keywords: Array<string> = t(`metaData.${pageKey}.keywords`, {
    returnObjects: true,
  });
  return {
    title: t(`metaData.${pageKey}.title`),
    description: t(`metaData.${pageKey}.description`),
    applicationName: t(`metaData.applicationName`),
    category: t(`metaData.${pageKey}.category`),
    creator: 'Ahmet Ulutaş',
    authors: [{ name: 'Ahmet Ulutaş' }],
    publisher: 'Ahmet Ulutaş',
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
    referrer: 'origin-when-cross-origin',
    keywords,
    verification: {
      google: 'xP70T5-1qM-9PajiTzupy6svF-SvB3D-PIlvb-orQ0A',
    },

    openGraph: {
      title: t(`metaData.${pageKey}.title`),
      images: [
        ...generateMetaImages({
          staticImage: {
            url: opengraphImage.src,
            alt: t(`metaData.${pageKey}.title`),
          },
          sizes: ogImageSizes,
        }),
        ...previousImages,
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t(`metaData.${pageKey}.title`),
      description: t(`metaData.${pageKey}.description`),
      images: [
        ...generateMetaImages({
          staticImage: {
            url: opengraphImage.src,
            alt: t(`metaData.${pageKey}.title`),
          },
          sizes: twitterImageSizes,
        }),
        ...previousImages,
      ],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
      languages: generateLocalesForMetaData(availableLocales),
    },
  };
};

export async function getLocalizedJsonLd(locale: LocaleType, pageKey: string) {
  const { t } = await createTranslation(locale, 'translation');
  const keywords: Array<string> = t(`metaData.${pageKey}.keywords`, {
    returnObjects: true,
  });
  const pathname = navLinks.find((item) => item.label === pageKey)?.href;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t(`metaData.${pageKey}.title`),
    url: locale === defaultLanguage ? `${baseUrl}${pathname}` : `${baseUrl}/${locale}${pathname}`,
    applicationCategory: t('labels.applicationCategory'),
    operatingSystem: 'All',
    description: t(`metaData.${pageKey}.description`),
    browserRequirements: t('labels.browserRequirements'),
    creator: {
      '@type': 'Organization',
      name: companyName,
    },
    keywords,
  };
}
