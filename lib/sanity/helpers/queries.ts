import { groq } from 'next-sanity';
import { ImageType } from '@/types/images';

const blogPostFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  content,
  language,
  coverImage,
  "headings": content[length(style) == 2 && string::startsWith(style, "h")],
  "slug": slug.current,
  "category": category->{name, slug},
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    _id,
    language,
    "slug": slug.current,
},
`;

export type Category = {
  name: string;
  slug?: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  coverImage: ImageType;
  date?: string;
  _updatedAt?: string;
  excerpt: string;
  category: Category;
  content?: unknown;
  language: string;
  metaFields?: {
    description: string;
    title: string;
  };
  _translations: Array<BlogPost>;
};

export const allBlogsQuery = groq`
*[_type == "blogs" && language == $language] | order(date desc, _updatedAt desc) {
  ${blogPostFields}
}`;

export const blogBySlugQuery = groq`
*[_type == "blogs" && slug.current == $slug && language == $language] [0] {
  ${blogPostFields}
}
`;
export const blogSlugsQuery = groq`
*[_type == "blogs"] | order(date desc, _updatedAt desc) {
  "slug": slug.current,
  language,
  _updatedAt,
}`;

export const blogAndMoreBlogsQuery = groq`
{
  "blog": *[_type == "blogs" && slug.current == $slug && language == $language] | order(_updatedAt desc) [0] {
    ${blogPostFields}
  },
  "moreBlogs": *[_type == "blogs" && slug.current != $slug && language == $language] | order(date desc, _updatedAt desc) [0...2] {
    ${blogPostFields}
  }
}`;
