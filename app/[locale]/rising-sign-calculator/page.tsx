import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { risingSignCalculatorFAQs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';

import { JsonSchema } from '@/components/shared/json.ld';
import { Suspense, lazy } from 'react';
import { createTranslation } from '@/i18n';

const RisingSignCalculator = lazy(() => import('@/components/pages/rising-sign-calculator'));
const pageKey = 'risingSignCalculator';
const Faq = lazy(() => import('@/components/shared/faq'));

export default async function RisignSignCalculatorPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const pageSchema = await getLocalizedJsonLd(params.locale, pageKey);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: risingSignCalculatorFAQs[params.locale].map(({ question, answer }) => ({
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
      <main className="flex flex-col items-center justify-center">
        <PageContainer className="flex flex-col md:flex-row gap-x-6 gap-2 my-4">
          <div className="flex-1">
            <h1 className="text-center text-2xl my-2">{t('labels.risingSignCalculator')}</h1>
            <Suspense fallback={<>Loading...</>}>
              <RisingSignCalculator currentLocale={params.locale} />
            </Suspense>
          </div>
          <Suspense fallback={<>Loading...</>}>
            <Faq faqList={risingSignCalculatorFAQs[params.locale]} />
          </Suspense>
        </PageContainer>
      </main>
      <JsonSchema schema={faqSchema} />
      {pageSchema && <JsonSchema schema={pageSchema} />}
    </>
  );
}

export async function generateMetadata(props: SharedPageProps, parent: ResolvingMetadata) {
  if (!props?.searchParams?.sign) {
    return getDefaultMetaData(props?.params?.locale, parent, pageKey);
  }
  return getDefaultMetaData(
    props?.params.locale,
    parent,
    pageKey,
    { key: 'metaData.risingSignCalculator.dynamicPageTitle', params: { sign: String(props?.searchParams?.sign) } },
    { key: 'metaData.risingSignCalculator.dynamicPageDescription', params: { sign: String(props?.searchParams?.sign) } }
  );
}
