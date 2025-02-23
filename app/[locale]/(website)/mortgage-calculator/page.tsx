import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { mortgageFaqs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';

import { JsonSchema } from '@/components/shared/json.ld';
import { Suspense, lazy } from 'react';

const Faq = lazy(() => import('@/components/shared/faq'));
const MortgageCalculator = lazy(() => import('@/components/pages/mortgage-calculator'));

const pageKey = 'mortgageCalculator';

export default async function Page(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const pageSchema = await getLocalizedJsonLd(params.locale, pageKey);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mortgageFaqs[params.locale].map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
  return (
    <>
      <article className="flex flex-col items-center justify-center">
        <PageContainer className="flex flex-col md:flex-row gap-x-6 gap-2 my-4">
          <div className="flex-1">
            <h1 className="text-center text-2xl my-2">{t('labels.mortgageCalculator')}</h1>
            <Suspense fallback={<>Loading...</>}>
              <MortgageCalculator currentLocale={params.locale} />
            </Suspense>
          </div>
          <Suspense fallback={<>Loading...</>}>
            <Faq faqList={mortgageFaqs[params.locale]} />
          </Suspense>
        </PageContainer>
      </article>
      <JsonSchema schema={faqSchema} />
      {pageSchema && <JsonSchema schema={pageSchema} />}
    </>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, pageKey);
}
