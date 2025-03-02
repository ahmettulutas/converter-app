import { SharedPageProps } from '../layout';
import { PageContainer } from '@/components/shared/page-container';
import CalculatorContainer from '@/components/layout/calculator-container';
import { JsonSchema } from '@/components/shared/json.ld';
import { createTranslation } from '@/i18n';
import { getLocalizedJsonLd } from '@/lib/seo';
import { birthMapFaqs } from '@/lib/constants/faq';

import JunoCalculator from '@/components/pages/juno-calculator';

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

  const pageSchema = await getLocalizedJsonLd(params.locale, pageKey);
  return (
    <>
      <article>
        <PageContainer className="flex flex-col gap-y-2 my-4">
          <h1 className="text-center text-2xl my-2">{t('labels.birthMapCalculator')}</h1>
          <CalculatorContainer
            faqProps={{ faqList: birthMapFaqs[params.locale] }}
            calculator={<JunoCalculator currentLocale={params.locale} />}
          />
        </PageContainer>
      </article>
      <JsonSchema schema={faqSchema} />
      {pageSchema && <JsonSchema schema={pageSchema} />}
    </>
  );
}
