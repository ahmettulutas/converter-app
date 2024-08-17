import { baseUrl, staticPageUrls } from '@/constants/common';
import { availableLocales, defaultLanguage } from '@/i18n/settings';

import { MetadataRoute } from 'next';

const staticSiteMapItems: MetadataRoute.Sitemap = staticPageUrls.flatMap((item, idx) => {
  return availableLocales.map((locale) => {
    if (locale === defaultLanguage) {
      return {
        url: `${baseUrl}${item}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
      };
    } else {
      return {
        url: `${baseUrl}/${locale}${item}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
      };
    }
  });
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...staticSiteMapItems];
}
