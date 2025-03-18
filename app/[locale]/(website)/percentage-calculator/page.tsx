import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { percentageFaqs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';

import { JsonSchema } from '@/components/shared/json.ld';
import { lazy } from 'react';
import CalculatorContainer from '@/components/layout/calculator-container';
import { percentTypes } from '@/lib/utils/calculate-percentage';
import { baseUrl } from '@/lib/constants/common';
import { defaultLanguage } from '@/i18n/settings';
import RelatedLinks from '@/components/shared/dynamic-links';

const PercentageCalculator = lazy(() => import('@/components/pages/percentage-calculator'));
const pageKey = 'percentageCalculator';

export default async function Page(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');

  const pageSchema = await getLocalizedJsonLd({ locale: params.locale, pageKey, pathname: 'percentage-calculator' });
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: percentageFaqs[params.locale].map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
  const relatedLinks = percentTypes.map((type) => ({
    title: t(`labels.${type}`),
    url:
      params.locale === defaultLanguage
        ? `${baseUrl}/percentage-calculator/${type}`
        : `${baseUrl}/${params.locale}/percentage-calculator/${type}`,
  }));

  return (
    <>
      <article>
        <PageContainer className="flex flex-col gap-y-2 my-4">
          <h1 className="text-center text-2xl my-2">{t('labels.percentageCalculator')}</h1>
          <CalculatorContainer
            faqProps={{ faqList: percentageFaqs[params.locale] }}
            calculator={
              <div className="flex flex-col gap-y-4">
                <PercentageCalculator currentLocale={params.locale} />
                <div className="max-w-xl mx-auto">
                  <RelatedLinks links={relatedLinks} title={t('labels.relatedLinks')} />
                </div>
              </div>
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
