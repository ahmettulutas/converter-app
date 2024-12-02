import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { Faq } from '@/components/shared/faq';
import { squareMeterConverterFAQs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';
import { JsonSchema } from '@/components/shared/json.ld';
import { Suspense, lazy } from 'react';

const SquareCalculator = lazy(() => import('@/components/pages/square-meter-calculator'));
const pageKey = 'squareCalculator';

export default async function SquareCalculatorPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const pageSchema = getLocalizedJsonLd(params.locale, pageKey);
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <PageContainer className="flex flex-col md:flex-row gap-x-6 gap-2 my-4">
          <div className="flex-1">
            <h1 className="text-center text-2xl my-2">{t('labels.squareCalculator')}</h1>
            <Suspense fallback={<>Loading...</>}>
              <SquareCalculator />
            </Suspense>
          </div>
          <Faq faqList={squareMeterConverterFAQs[params.locale]} />
        </PageContainer>
      </main>
      <JsonSchema schema={pageSchema} />
    </>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, pageKey);
}
