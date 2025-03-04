import { createTranslation } from '@/i18n';
import { LocaleType, availableLocales, defaultLanguage } from '@/i18n/settings';
import { Metadata, ResolvingMetadata } from 'next';
import opengraphImage from '../public/eq-logo.jpg';
import { baseUrl, companyName, navCategories, ogImageSizes, twitterImageSizes } from '@/lib/constants/common';
import { urlForImage } from './sanity/helpers/image-fns';
import { ImageType } from '@/types/images';
import { BlogPost } from './sanity/queries/blog-queries';

export const generateLocalesForMetaData = (languages: typeof availableLocales) => {
  const locales: Record<string, string> = {};
  for (const key of languages) {
    locales[key] = key;
  }
  return locales;
};

type GenerateMetaImageProps = {
  sanityImage?: ImageType;
  sizes: Array<{ width: number; height: number }>;
  staticImage?: { url: string | URL; alt?: string };
  title: string;
};

export const generateSanityOgImages = ({ sanityImage, sizes, title }: GenerateMetaImageProps) => {
  if (!sanityImage) return [];
  const metaImages = [];
  for (const { width, height } of sizes) {
    const imgUrl = urlForImage(sanityImage)?.height(height).width(width).fit('crop').auto('format').url();
    metaImages.push({
      width,
      height,
      alt: sanityImage?.alt ?? title,
      url: imgUrl,
      secureUrl: imgUrl,
    });
  }
  return metaImages;
};

const generateOgImages = (baseUrl: string, imagePath: string, title: string, sanityUrl: boolean = false) =>
  ogImageSizes.map(({ width, height }) => ({
    url: `${baseUrl}${imagePath}?w=${width}&h=${height}`,
    width,
    height,
    alt: title,
  }));

const generateTwitterImages = (baseUrl: string, imagePath: string, title: string) =>
  twitterImageSizes.map(({ width, height }) => ({
    url: `${baseUrl}${imagePath}?w=${width}&h=${height}`,
    width,
    height,
    alt: title,
  }));

export const getDefaultMetaData = async (
  locale: LocaleType,
  parent: ResolvingMetadata,
  pageKey: string,
  dynamicTitle?: string,
  dynamicDescription?: string
): Promise<Metadata> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await createTranslation(locale, 'translation'); // This is not actually a hook, so I intentionally ignored it here.
  const previousImages = (await parent).openGraph?.images || [];
  const keywords: Array<string> = t(`metaData.${pageKey}.keywords`, {
    returnObjects: true,
  });
  const defaultTitle = t(`metaData.${pageKey}.title`);
  const defaultDescription = t(`metaData.${pageKey}.description`);
  const title = dynamicTitle ?? defaultTitle;
  const description = dynamicDescription ?? defaultDescription;
  return {
    title,
    description,
    applicationName: t(`metaData.applicationName`),
    category: t(`metaData.${pageKey}.category`),
    creator: 'Ahmet Ulutaş',
    authors: [{ name: 'Ahmet Ulutaş' }],
    publisher: 'Ahmet Ulutaş',
    metadataBase: new URL(baseUrl),
    referrer: 'origin-when-cross-origin',
    keywords,
    verification: {
      google: 'xP70T5-1qM-9PajiTzupy6svF-SvB3D-PIlvb-orQ0A',
    },

    openGraph: {
      title,
      images: [...generateOgImages(baseUrl, opengraphImage.src, title), ...previousImages],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: 'Ahmet Ulutaş',
      images: [...generateTwitterImages(baseUrl, opengraphImage.src, title), ...previousImages],
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};

export async function getLocalizedJsonLd(
  locale: LocaleType,
  pageKey: string,
  dynamicTitle?: string,
  dynamicDescription?: string
) {
  const { t } = await createTranslation(locale, 'translation');
  const keywords: Array<string> = t(`metaData.${pageKey}.keywords`, {
    returnObjects: true,
  });
  const pathname = navCategories
    .flatMap(({ links }) => links.map((link) => link))
    .find((item) => item.label === pageKey)?.href;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: dynamicTitle ?? t(`metaData.${pageKey}.title`),
    url: `${baseUrl}/${locale}${pathname}`,
    applicationCategory: t('labels.applicationCategory'),
    operatingSystem: 'All',
    description: dynamicDescription ?? t(`metaData.${pageKey}.description`),
    browserRequirements: t('labels.browserRequirements'),
    creator: {
      '@type': 'Organization',
      name: companyName,
    },
    keywords,
  };
}

export function generateBlogPostSchema(blogPost: BlogPost) {
  const { _id, title, slug, coverImage, date, description, category, language, _translations } = blogPost;
  const imageUrl = urlForImage(coverImage).height(1000).width(2000).url();
  return {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${new URL(process.env.NEXT_PUBLIC_BASE_URL as string)}/${slug}`,
    },
    headline: title,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 300,
      height: 300,
    },
    datePublished: date || new Date().toISOString(),
    dateModified: blogPost._updatedAt || date || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: companyName,
    },
    description: description,
    articleSection: category?.name,
    inLanguage: language,
    publisher: {
      '@type': 'Organization',
      name: companyName,
      logo: {
        '@type': 'ImageObject',
        url: opengraphImage.src,
      },
    },
    articleBody: description,
    isPartOf: {
      '@type': 'Blog',
      name: title,
    },
    hasPart: _translations?.map((translation) => ({
      '@type': 'BlogPosting',
      headline: translation.title,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${translation.slug}`,
      inLanguage: translation.language,
    })),
  };
}
