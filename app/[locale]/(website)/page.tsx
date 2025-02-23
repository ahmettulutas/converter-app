import { SharedPageProps } from './layout';
import { createTranslation } from '@/i18n';
import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { PageContainer } from '@/components/shared/page-container';
import { lengthRates, lengthUnits } from '@/lib/constants/units';

import { lengthFaqs } from '@/lib/constants/faq';
import { JsonSchema } from '@/components/shared/json.ld';
import { Suspense, lazy } from 'react';
import CalculatorContainer from '@/components/layout/calculator-container';

const Faq = lazy(() => import('@/components/shared/faq'));
const pageKey = 'lengthCalculator';
const Converter = lazy(() => import('@/components/pages/converter'));

export default async function LengthConverterPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const pageSchema = await getLocalizedJsonLd(params.locale, pageKey);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: lengthFaqs[params.locale].map(({ question, answer }) => ({
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
            faqProps={{ faqList: lengthFaqs[params.locale] }}
            calculator={
              <Converter
                units={lengthUnits}
                initialInputUnit="meters"
                initialOutputUnit="feet"
                rates={lengthRates}
                title={t('labels.lengthCalculator')}
                description={t('metaData.lengthCalculator.description')}
              />
            }
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
