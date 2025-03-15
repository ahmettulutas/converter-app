import { SharedPageProps } from '../layout';
import { PageContainer } from '@/components/shared/page-container';
import CalculatorContainer from '@/components/layout/calculator-container';
import { JsonSchema } from '@/components/shared/json.ld';
import { createTranslation } from '@/i18n';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';
import { birthMapFaqs } from '@/lib/constants/faq';
import { ResolvingMetadata } from 'next';

import dynamic from 'next/dynamic';

const DualBirthMapCalculator = dynamic(() => import('@/components/pages/birth-map-calculator'), { ssr: false });

const pageKey = 'birthMapCalculator';
export default async function Page(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: birthMapFaqs[params.locale].map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  const pageSchema = await getLocalizedJsonLd({ locale: params.locale, pageKey, pathname: 'birth-map-calculator' });
  return (
    <>
      <article>
        <PageContainer className="flex flex-col gap-y-2 my-4">
          <h1 className="text-center text-2xl my-2">{t('labels.birthMapCalculator')}</h1>
          <CalculatorContainer
            faqProps={{ faqList: birthMapFaqs[params.locale] }}
            calculator={<DualBirthMapCalculator currentLocale={params.locale} />}
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
