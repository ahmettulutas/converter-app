import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { CardContainer } from '@/components/shared/card-container';
import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';
import { Converter } from '@/components/pages/converter';
import { weightRates, weightUnits } from '@/lib/constants/units';

import { Faq } from '@/components/shared/faq';
import { PageContainer } from '@/components/shared/page-container';
import { weightFaqs } from '@/lib/constants/faq';
import { JsonSchema } from '@/components/shared/json.ld';

const pageKey = 'weightCalculator';

export default async function WeightConverterPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  const pageSchema = await getLocalizedJsonLd(params.locale, pageKey);
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <PageContainer className="flex flex-col gap-2 my-4">
          <h1 className="text-center text-2xl my-2">{t('labels.weightCalculator')}</h1>
          <CardContainer>
            <Converter
              units={weightUnits}
              initialInputUnit="kilograms"
              initialOutputUnit="pounds"
              rates={weightRates}
            />
          </CardContainer>
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
