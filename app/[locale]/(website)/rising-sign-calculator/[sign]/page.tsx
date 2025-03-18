import { SharedPageProps } from '../../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { risingSignCalculatorFAQs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';

import { JsonSchema } from '@/components/shared/json.ld';
import { lazy } from 'react';
import { createTranslation } from '@/i18n';

import { defaultLanguage, LocaleType } from '@/i18n/settings';
import CalculatorContainer from '@/components/layout/calculator-container';
import RelatedLinks from '@/components/shared/dynamic-links';
import { zodiacSigns } from '@/lib/utils/calculate-rising';
import { baseUrl } from '@/lib/constants/common';

const RisingSignCalculator = lazy(() => import('@/components/pages/rising-sign-calculator'));
const pageKey = 'risingSignCalculator';

export default async function RisignSignCalculatorPage(
  props: Readonly<SharedPageProps> & { params: { sign: string; locale: LocaleType } }
) {
  const { params } = props;
  const sign = params?.sign;
  const { t } = await createTranslation(params.locale, 'translation');
  const translatedSign = sign ? t(`labels.${sign}`) : '';

  const dynamicTitle = translatedSign
    ? t('metaData.risingSignCalculator.dynamicPageTitle', { translatedSign })
    : undefined;
  const dynamicDescription = translatedSign
    ? t('metaData.risingSignCalculator.dynamicPageDescription', { translatedSign })
    : undefined;

  const pageSchema = await getLocalizedJsonLd({
    dynamicDescription,
    dynamicTitle,
    locale: params.locale,
    pageKey,
    pathname: `rising-sign-calculator/${sign}`,
  });

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

  const relatedLinks = zodiacSigns.map((sign) => ({
    title: t('metaData.risingSignCalculator.dynamicPageTitle', { translatedSign: t(`labels.${sign}`) }),
    url:
      params.locale === defaultLanguage
        ? `${baseUrl}/rising-sign-calculator/${sign}`
        : `${baseUrl}/${params.locale}/rising-sign-calculator/${sign}`,
  }));

  return (
    <>
      <article>
        <PageContainer className="flex flex-col gap-y-2 my-4">
          <h1 className="text-center text-2xl my-2">{dynamicTitle ?? t('labels.risingSignCalculator')}</h1>
          <CalculatorContainer
            faqProps={{ faqList: risingSignCalculatorFAQs[params.locale] }}
            calculator={
              <div className="flex flex-col gap-y-4">
                <RisingSignCalculator currentLocale={params.locale} initialSign={params.sign} />
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

export async function generateMetadata(
  { params }: { params: { sign: string; locale: LocaleType } },
  parent: ResolvingMetadata
) {
  const { t } = await createTranslation(params.locale, 'translation');

  const sign = params.sign;

  if (!sign) {
    return getDefaultMetaData(params.locale, parent, pageKey);
  }

  const translatedSign = sign ? t(`labels.${sign}`) : '';
  const title = translatedSign ? t('metaData.risingSignCalculator.dynamicPageTitle', { translatedSign }) : undefined;
  const description = translatedSign
    ? t('metaData.risingSignCalculator.dynamicPageDescription', { translatedSign })
    : undefined;

  return getDefaultMetaData(params.locale, parent, pageKey, title, description);
}
