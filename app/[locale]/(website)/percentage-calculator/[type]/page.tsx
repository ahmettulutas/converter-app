import { createTranslation } from '@/i18n';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { percentageFaqs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';

import { JsonSchema } from '@/components/shared/json.ld';
import { lazy } from 'react';
import CalculatorContainer from '@/components/layout/calculator-container';
import { SharedPageProps } from '../../layout';
import { LocaleType } from '@/i18n/settings';
import { CalculationType, getPercentageDescription, percentTypes } from '@/lib/utils/calculate-percentage';

const PercentageCalculator = lazy(() => import('@/components/pages/percentage-calculator'));
const pageKey = 'percentageCalculator';
type DynamicPageProps = Readonly<SharedPageProps> & { params: { type: CalculationType; locale: LocaleType } };

export default async function Page(props: DynamicPageProps) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const initialType = percentTypes.includes(params.type) ? params.type : undefined;
  const dynamicTitle = initialType ? t(`labels.${initialType}`) : undefined;
  const dynamicDescription = initialType ? t(getPercentageDescription(initialType)) : undefined;

  const pageSchema = await getLocalizedJsonLd({
    dynamicDescription,
    dynamicTitle,
    locale: params.locale,
    pageKey,
    pathname: `percentage-calculator/${initialType}`,
  });

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

  return (
    <>
      <article>
        <PageContainer className="flex flex-col gap-y-2 my-4">
          <h1 className="text-center text-2xl my-2">
            {initialType ? t(`labels.${initialType}`) : t('labels.percentageCalculator')}
          </h1>
          <CalculatorContainer
            faqProps={{ faqList: percentageFaqs[params.locale] }}
            calculator={<PercentageCalculator currentLocale={params.locale} initialType={initialType} />}
          />
        </PageContainer>
      </article>
      <JsonSchema schema={faqSchema} />
      {pageSchema && <JsonSchema schema={pageSchema} />}
    </>
  );
}

export async function generateMetadata({ params }: DynamicPageProps, parent: ResolvingMetadata) {
  const { t } = await createTranslation(params.locale, 'translation');

  const type = params.type;

  if (!type) {
    return getDefaultMetaData(params.locale, parent, pageKey);
  }

  const title = t(`labels.${type}`);
  const dynamicDescription = t(getPercentageDescription(type));

  return getDefaultMetaData(params.locale, parent, pageKey, title, dynamicDescription);
}
