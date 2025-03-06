import { getAllBlogs } from '@/actions/blog';

import { notFound } from 'next/navigation';

import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';
import { PageContainer } from '@/components/shared/page-container';
import { BlogCardList } from '@/components/shared/blog-list';

export default async function BlogPage({ params }: Readonly<SharedPageProps>) {
  const { locale } = params;
  const { t } = await createTranslation(locale, 'translation');
  const blogs = await getAllBlogs(locale);
  if (!blogs || !blogs?.length) return notFound();

  return (
    <article>
      <PageContainer className="mt-8">
        <h1 className="mb-6 lg:mb-10 text-lg lg:text-2xl">{t('labels.blog')}</h1>
        <section className="grid gap-y-12 md:gap-y-24 my-6 lg:my-10">
          <BlogCardList blogList={blogs} currentLocale={locale} />
        </section>
      </PageContainer>
    </article>
  );
}
