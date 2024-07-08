import { baseUrl, staticPageUrls } from "@/constants/common";
import { availableLocales, defaultLanguage } from "@/i18n/settings";

import { MetadataRoute } from "next";
/* return type must be Sitemap
Reference link : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap */

const staticSiteMapItems: MetadataRoute.Sitemap = staticPageUrls.flatMap(
  (item, idx) => {
    return availableLocales.map((locale) => {
      if (locale === defaultLanguage) {
        return {
          url: `${baseUrl}${item}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 1,
        };
      } else {
        return {
          url: `${baseUrl}/${locale}${item}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: idx,
        };
      }
    });
  }
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...staticSiteMapItems];
}
