import { SharedPageProps } from './layout';
import { createTranslation } from '@/i18n';
import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { PageContainer } from '@/components/shared/page-container';
import { lengthRates, lengthUnits } from '@/lib/constants/units';
import { Faq } from '@/components/shared/faq';
import { lengthFaqs } from '@/lib/constants/faq';
import { JsonSchema } from '@/components/shared/json.ld';
import { Suspense, lazy } from 'react';

const pageKey = 'lengthCalculator';
const Converter = lazy(() => import('@/components/pages/converter'));

export default async function LengthConverterPage(props: Readonly<SharedPageProps>) {
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
                units={lengthUnits}
                initialInputUnit="meters"
                initialOutputUnit="feet"
                rates={lengthRates}
                title={t('labels.lengthCalculator')}
                description={t('metaData.lengthCalculator.description')}
              />
            </Suspense>
          </div>
          <Faq faqList={lengthFaqs[params.locale]} />
        </PageContainer>
      </main>
      <JsonSchema schema={pageSchema} />
    </>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, pageKey);
}
