import { groq } from 'next-sanity';
import { ImageType } from '@/types/images';
import { TypedObject } from 'sanity';

export type HeadingLink = {
  _key: string;
  children?: HeadingLink[];
  subheadings?: HeadingLink[];
  text?: string;
};
const blogPostFields = groq`
  _id,
  title,
  date,
  description,
  content,
  language,
  faq,
  coverImage {
  ...,
   "blurDataURL":asset->metadata.lqip,
  },
  showOnMenu,
  "headings": content[style == "h1" || style == "h2" || style == "h3" || style == "h4" || style == "h5" || style == "h6"],
  "slug": slug.current,
  "category": category->{
    "name": name[$language],
    "slug": slug.current
  },
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    _id,
    language,
    "slug": slug.current
  }
`;
export type Faq = { question: string; answer: string; _key: string };
export type Category = {
  name: string;
  slug: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  coverImage: ImageType & { blurDataURL?: string };
  date?: string;
  description: string;
  _updatedAt?: string;
  category: Category;
  content?: TypedObject;
  language: string;
  _translations: Array<BlogPost>;
  headings: HeadingLink[];

  faq?: Array<Faq>;
};

export const allBlogsByLanguage = groq`
*[_type == "blogs" && $language in language] | order(date desc, _updatedAt desc) {
  _id,
  title,
  date,
  description,
  "slug": slug.current,
  category,
  "category": category->{
    "name": name[$language],
    "slug": slug.current
  },
}`;

export const blogBySlugQuery = groq`
coalesce(
  // 1️⃣ Exact Match: Slug + Language
  *[_type == "blogs" && slug.current == $slug && $language in language][0] {
    ${blogPostFields}
  },

  // 2️⃣ Fallback: Translation Reference (matching language via metadata)
  *[
    _type == "blogs" &&
    _id in *[
      _type == "translation.metadata" &&
      references(*[_type == "blogs" && slug.current == $slug]._id)
    ].translations[].value._ref &&
    $language in language
  ][0] {
    ${blogPostFields}
  },

  // 3️⃣ Special Case: If language is 'en', return any English blog (ignores slug)
  *[_type == "blogs" && "en" in language][0] {
    ${blogPostFields}
  },

  // 4️⃣ Fallback: Blog with defaultLocale 
  *[_type == "blogs" && slug.current == $slug && "en" in language][0] {
      ${blogPostFields}
  },

  // 5️⃣ Final Fallback: Any blog with the same slug (regardless of language)
  *[_type == "blogs" && slug.current == $slug][0] {
    ${blogPostFields}
  }
)
`;

export const allBlogSlugsQuery = groq`
*[_type == "blogs"] | order(date desc, _updatedAt desc) {
  "slug": slug.current,
  language,
  _updatedAt,
}`;

/* export const blogBySlugQuery = groq`
  *[_type == "blogs" && slug.current == $slug] | order(_createdAt asc) {
    ${blogPostFields},
    language
  }[language == $language][0]
  || 
  *[_type == "blogs" && slug.current == $slug && "en" in language][0]
  ||
  *[_type == "blogs" && slug.current == $slug][0]
`; */

export const allBlogsByCategory = groq`
*[_type == "blogs" && $language in language && category->slug.current == $categorySlug]{
  _id,
  title,
  coverImage,
  "slug": slug.current,
  category,
  "category": category->{
    "name": name[$language],
    "slug": slug.current
  },
}
`;
// export const blogByIdQuery = groq`
//  *[_type == "blogs" && slug.current == $slug && $language in language] | order(_updatedAt desc) [0] {
//     ${blogPostFields}
// }`;

export const moreBlogsQuery = groq`
*[_type == "blogs" && slug.current != $slug && $language in language] | order(date desc, _updatedAt desc) [0...2] {
    ${blogPostFields}
}`;
