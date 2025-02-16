import { baseUrl, staticPageUrls } from '@/lib/constants/common';
import { availableLocales, defaultLanguage } from '@/i18n/settings';

import { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/actions/blog';

const staticSiteMapItems: MetadataRoute.Sitemap = staticPageUrls.flatMap((item) => {
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
  const allBlogs = await getAllBlogSlugs();
  const dynamicBlogSlugs: MetadataRoute.Sitemap = allBlogs.map(({ language, _updatedAt, slug }) => ({
    url: `${baseUrl}/${language}/${slug}`,
    lastModified: _updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  return [...staticSiteMapItems, ...dynamicBlogSlugs];
}
