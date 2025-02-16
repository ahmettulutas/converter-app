import {
  BlogPost,
  allBlogsByCategory,
  allBlogsByLanguage,
  blogBySlugQuery,
  allBlogSlugsQuery,
} from '@/lib/sanity/queries/blog-queries';
import { sanityClient } from '@/lib/sanity/sanity-client';

const client = sanityClient();

export type BlogPostForList = Pick<BlogPost, '_id' | 'title' | 'description' | 'date' | 'slug' | 'category'>;

export async function getAllBlogs(language: string): Promise<BlogPostForList[]> {
  const res = await client.fetch(allBlogsByLanguage, { language });
  return res || [];
}

/* export async function getBlogsBySlug(): Promise<
    Pick<BlogPost, 'slug' | 'language' | '_updatedAt'>[]
  > {
    const slugs =
      (await client.fetch<{ slug: string; language: string; _updatedAt: string }[]>(
        blogBySlugQuery
      )) || [];
    return slugs.map(({ slug, language, _updatedAt }) => ({
      slug,
      language,
      _updatedAt,
    }));
  } */

export async function getBlogBySlug(slug: string, language: string): Promise<BlogPost> {
  return await client.fetch<BlogPost>(blogBySlugQuery, { slug, language });
}

export async function getBlogsByCategory(categorySlug: string, language: string): Promise<BlogPostForList[]> {
  return await client.fetch<BlogPostForList[]>(allBlogsByCategory, {
    categorySlug,
    language,
  });
}

export async function getAllBlogSlugs(): Promise<Pick<BlogPost, 'slug' | 'language' | '_updatedAt'>[]> {
  const res = await client.fetch(allBlogSlugsQuery);
  return res || [];
}
