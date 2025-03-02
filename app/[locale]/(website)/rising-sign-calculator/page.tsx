import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { risingSignCalculatorFAQs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';

import { JsonSchema } from '@/components/shared/json.ld';
import { lazy } from 'react';
import { createTranslation } from '@/i18n';

import { LocaleType } from '@/i18n/settings';
import CalculatorContainer from '@/components/layout/calculator-container';

const RisingSignCalculator = lazy(() => import('@/components/pages/rising-sign-calculator'));
const pageKey = 'risingSignCalculator';

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
      <article>
        <PageContainer className="flex flex-col gap-y-2 my-4">
          <h1 className="text-center text-2xl my-2">{t('labels.risingSignCalculator')}</h1>
          <CalculatorContainer
            faqProps={{ faqList: risingSignCalculatorFAQs[params.locale] }}
            /* calculator={<RisingSignCalculator currentLocale={params.locale} />} */
            calculator={<RisingSignCalculator currentLocale={params.locale} />}
          />
        </PageContainer>
      </article>
      <JsonSchema schema={faqSchema} />
      {pageSchema && <JsonSchema schema={pageSchema} />}
    </>
  );
}

export async function generateMetadata(
  { params }: { params: { sign: string; locale: LocaleType } },
  parent: ResolvingMetadata
) {
  const { t } = await createTranslation(params.locale, 'translation');

  const sign = params.sign;

  if (!sign) {
    return getDefaultMetaData(params.locale, parent, pageKey);
  }

  const title = t('metaData.risingSignCalculator.dynamicPageTitle', { sign });
  const description = t('metaData.risingSignCalculator.dynamicPageDescription', { sign });

  return getDefaultMetaData(params.locale, parent, pageKey, title, description);
}
