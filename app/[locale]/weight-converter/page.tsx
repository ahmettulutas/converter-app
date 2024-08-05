import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { CardContainer } from '@/components/shared/card-container';
import { ResolvingMetadata } from 'next';
import { getDefaultMetaData } from '@/lib/seo';
import { Converter } from '@/components/pages/converter';
import { weightRates, weightUnits } from '@/constants/units';
import { weightFaqs } from '@/constants/faq';
import { Faq } from '@/components/shared/faq';
import { PageContainer } from '@/components/shared/page-container';

export default async function WeightConverterPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');

  return (
    <main className="flex flex-col items-center justify-center">
      <PageContainer className="flex flex-col gap-2 my-4">
        <h1 className="text-center text-2xl my-2">{t('labels.weightHeader')}</h1>
        <CardContainer>
          <Converter units={weightUnits} initialInputUnit="kilograms" initialOutputUnit="pounds" rates={weightRates} />
        </CardContainer>
        <Faq faqList={weightFaqs[params.locale]} />
      </PageContainer>
    </main>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, 'weight');
}
