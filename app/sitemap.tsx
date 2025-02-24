import { baseUrl, staticPageUrls } from '@/lib/constants/common';
import { availableLocales, defaultLanguage } from '@/i18n/settings';

import { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/actions/blog';
import { zodiacSigns } from '@/lib/utils/calculate-rising';

const staticSiteMapItems: MetadataRoute.Sitemap = staticPageUrls.flatMap((item) => {
  return availableLocales.map((locale) => {
    return {
      url: locale === defaultLanguage ? `${baseUrl}/${item}` : `${baseUrl}/${locale}${item}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    };
  });
});
const risingSignDynamicLinks: MetadataRoute.Sitemap = zodiacSigns.flatMap((sign) => {
  return availableLocales.map((locale) => {
    return {
      url: `${baseUrl}/${locale}/rising-sign-calculator/${sign}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
    };
  });
});
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBlogs = await getAllBlogSlugs();
  const dynamicBlogSlugs: MetadataRoute.Sitemap = allBlogs.map(({ language, _updatedAt, slug }) => ({
    url: `${baseUrl}/${language}/blog/${slug}`,
    lastModified: _updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticSiteMapItems, ...dynamicBlogSlugs, ...risingSignDynamicLinks];
}
