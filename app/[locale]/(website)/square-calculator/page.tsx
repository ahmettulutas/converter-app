import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { squareMeterConverterFAQs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';
import { JsonSchema } from '@/components/shared/json.ld';
import { lazy } from 'react';
import CalculatorContainer from '@/components/layout/calculator-container';

const SquareCalculator = lazy(() => import('@/components/pages/square-meter-calculator'));
const Faq = lazy(() => import('@/components/shared/faq'));
const pageKey = 'squareCalculator';

export default async function SquareCalculatorPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const pageSchema = await getLocalizedJsonLd({ locale: params.locale, pageKey, pathname: 'square-calculator' });
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: squareMeterConverterFAQs[params.locale].map(({ question, answer }) => ({
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
            faqProps={{ faqList: squareMeterConverterFAQs[params.locale] }}
            calculator={<SquareCalculator />}
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
