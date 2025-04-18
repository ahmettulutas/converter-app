import { getAllBlogSlugs, getBlogBySlug } from '@/actions/blog';
import { CalculatorRenderer } from '@/components/shared/calculator-renderer';
import { JsonSchema } from '@/components/shared/json.ld';
import { PageContainer } from '@/components/shared/page-container';
import { PortableText } from '@/components/shared/rich-text-content';
import { SocialShareLinks } from '@/components/shared/share-social-media';
import { TableOfContentSkeleton } from '@/components/skeletons/table-of-content';
import { createTranslation } from '@/i18n';
import { defaultLanguage, LocaleType } from '@/i18n/settings';
import { baseUrl, ogImageSizes, twitterImageSizes } from '@/lib/constants/common';
import { urlForImage } from '@/lib/sanity/helpers/image-fns';
import { generateBlogPostSchema, generateSanityOgImages, getDefaultMetaData } from '@/lib/seo';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { lazy, Suspense } from 'react';

const TableOfContent = lazy(() => import('@/components/shared/table-of-content'));

async function getPageData(slug: string, language: LocaleType) {
  try {
    const blog = await getBlogBySlug(slug, language);
    if (!blog) return notFound();

    // const availableBlogLanguages = blog?._translations?.filter(Boolean).map((item) => ({
    //   language: item?.language,
    //   slug: item?.slug,
    // }));

    return {
      blog,
      // relatedSlugs: availableBlogLanguages.length
      //   ? availableBlogLanguages
      //   : [{ language: blog.language, slug: blog.slug }],
    };
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

type BlogDetailPageProps = {
  params: Promise<{
    locale: LocaleType;
    slug: string;
  }>;
};

export default async function BlogDetailPage(props: BlogDetailPageProps) {
  const { params } = props;
  const { locale, slug } = await params;
  const data = await getPageData(slug, locale);
  const { t } = await createTranslation(locale, 'translation');
  const heroImg = data.blog.coverImage
    ? urlForImage(data.blog.coverImage)
        .quality(100) // Prevents aggressive compression
        .auto('format')
        .width(600)
        .height(600)
        .url()
    : null;

  return (
    <>
      <article>
        <PageContainer className="max-w-5xl">
          <div>
            <h1 className="text-4xl md:text-6xl mb-10 lg:text-5xl text-center">{data?.blog?.title}</h1>
          </div>
          {heroImg && (
            <div className="relative aspect-video mb-8 rounded-md overflow-hidden shadow-md">
              <Image
                src={heroImg}
                alt={data.blog.coverImage.alt ?? data.blog.title}
                fill
                placeholder="blur"
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                {...(data.blog?.coverImage?.blurDataURL && {
                  placeholder: 'blur',
                  blurDataURL: data.blog.coverImage.blurDataURL,
                })}
                priority
              />
            </div>
          )}
          {data?.blog?.calculator && (
            <Suspense fallback={<>Loading...</>}>
              <section className="my-6 lg:my-8">
                <CalculatorRenderer calculator={data.blog.calculator[0]} locale={locale} />
              </section>
            </Suspense>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6 my-2 pt-1">
            <div className="col-span-1 md:col-span-2 mt-2">
              {data.blog.content ? (
                <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                  <PortableText value={data.blog.content} />
                </div>
              ) : (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>İçerik bulunamadı.</p>
                </div>
              )}
            </div>

            {data?.blog?.headings?.length > 0 && (
              <div className="col-span-1">
                <div className="md:sticky md:top-2 border p-4 bg-background">
                  <details open>
                    <summary className="text-lg font-semibold cursor-pointer">{t('labels.tableOfContent')}</summary>
                    <TableOfContent headings={data?.blog?.headings} language={'locale'} />
                  </details>
                </div>
              </div>
            )}
          </div>
        </PageContainer>
        <div className="my-4 ml-auto w-min">
          <SocialShareLinks shareUrl={`${baseUrl}/${locale}/blog/${slug}`} />
        </div>
      </article>
      <JsonSchema schema={generateBlogPostSchema(data.blog)} />
      {data.blog.faq && (
        <JsonSchema
          schema={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: data.blog.faq?.map(({ question, answer }) => ({
              '@type': 'Question',
              name: question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: answer,
              },
            })),
          }}
        />
      )}
    </>
  );
}

export async function generateStaticParams() {
  const allSlugs = await getAllBlogSlugs();
  const params = allSlugs.filter(Boolean).map(({ slug, language }) => ({
    locale: language?.[0] ?? defaultLanguage,
    slug: `${slug}`,
  }));
  return params;
}

export async function generateMetadata({ params }: BlogDetailPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug, locale } = await params;
  const blogPost = await getBlogBySlug(slug, locale);
  if (!blogPost) return getDefaultMetaData(locale, parent, 'blogSlug');
  const { t } = await createTranslation(locale, 'translation');
  const metaTitle = blogPost.title ?? t('metaData.defaultTitle');
  const metaDescription = blogPost.description ?? t('metaData.defaultBlogDesc');
  const previousImages = (await parent).openGraph?.images || [];
  const ogImages = generateSanityOgImages({
    sanityImage: blogPost?.coverImage,
    sizes: ogImageSizes,
    title: metaTitle,
  });
  const twitterImages = generateSanityOgImages({
    sanityImage: blogPost?.coverImage,
    sizes: twitterImageSizes,
    title: metaTitle,
  });

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      images: [...ogImages, ...previousImages],
      description: metaDescription,
      title: metaTitle,
    },
    twitter: {
      card: 'summary',
      title: metaTitle,
      description: metaDescription,
      images: [...twitterImages, ...previousImages],
      site: process.env.NEXT_PUBLIC_BASE_URL,
    },
    alternates: {
      canonical: `${new URL(process.env.NEXT_PUBLIC_BASE_URL as string)}/${locale}/blogs/${slug}`,
    },
  };
}
