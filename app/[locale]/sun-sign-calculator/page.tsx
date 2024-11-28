import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { Faq } from '@/components/shared/faq';
import { sunSignFaqs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';

import { JsonSchema } from '@/components/shared/json.ld';
import SunSignCalculator from '@/components/pages/sun-sign-calculator';

const pageKey = 'sunSignCalculator';

export default async function RisignSignCalculatorPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const pageSchema = await getLocalizedJsonLd(params.locale, pageKey);

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <PageContainer className="flex flex-col gap-2 my-4">
          <h1 className="text-center text-2xl my-2">{t('labels.sunSignCalculator')}</h1>
          <SunSignCalculator currentLocale={params.locale} />
          <Faq faqList={sunSignFaqs[params.locale]} />
        </PageContainer>
      </main>
      {pageSchema && <JsonSchema schema={pageSchema} />}
    </>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, pageKey);
}
