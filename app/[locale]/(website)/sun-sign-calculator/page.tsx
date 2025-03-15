import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { sunSignFaqs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';

import { JsonSchema } from '@/components/shared/json.ld';
import { Suspense, lazy } from 'react';
import CalculatorContainer from '@/components/layout/calculator-container';

const SunSignCalculator = lazy(() => import('@/components/pages/sun-sign-calculator'));
const Faq = lazy(() => import('@/components/shared/faq'));
const pageKey = 'sunSignCalculator';

export default async function RisignSignCalculatorPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');

  const pageSchema = await getLocalizedJsonLd({ locale: params.locale, pageKey, pathname: 'sun-sign-calculator' });
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sunSignFaqs[params.locale].map(({ question, answer }) => ({
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
      <article className="flex flex-col items-center justify-center w-full">
        <PageContainer className="flex flex-col gap-y-2 my-4">
          <h1 className="text-center text-2xl my-2">{t('labels.lengthCalculator')}</h1>
          <CalculatorContainer
            faqProps={{ faqList: sunSignFaqs[params.locale] }}
            calculator={<SunSignCalculator currentLocale={params.locale} />}
          />
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
