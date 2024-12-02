import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { weightRates, weightUnits } from '@/lib/constants/units';

import { Faq } from '@/components/shared/faq';
import { PageContainer } from '@/components/shared/page-container';
import { weightFaqs } from '@/lib/constants/faq';
import { JsonSchema } from '@/components/shared/json.ld';
import { Suspense, lazy } from 'react';

const Converter = lazy(() => import('@/components/pages/converter'));
const pageKey = 'weightCalculator';

export default async function WeightConverterPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const pageSchema = await getLocalizedJsonLd(params.locale, pageKey);
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <PageContainer className="flex flex-col md:flex-row gap-x-6 gap-2 my-4">
          <div className="flex-1">
            <h1 className="text-center text-2xl my-2">{t('labels.weightCalculator')}</h1>
            <Suspense fallback={<>Loading...</>}>
              <Converter
                units={weightUnits}
                initialInputUnit="kilograms"
                initialOutputUnit="pounds"
                rates={weightRates}
                title={t('labels.weightCalculator')}
                description={t('metaData.weightCalculator.description')}
              />
            </Suspense>
          </div>
          <Faq faqList={weightFaqs[params.locale]} />
        </PageContainer>
      </main>
      <JsonSchema schema={pageSchema} />
    </>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, pageKey);
}
