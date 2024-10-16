import { SharedPageProps } from './layout';
import { createTranslation } from '@/i18n';
import { CardContainer } from '@/components/shared/card-container';
import { ResolvingMetadata } from 'next';
import { getDefaultMetaData } from '@/lib/seo';
import { Converter } from '@/components/pages/converter';
import { PageContainer } from '@/components/shared/page-container';
import { lengthRates, lengthUnits } from '@/lib/constants/units';
import { Faq } from '@/components/shared/faq';
import { lengthFaqs } from '@/lib/constants/faq';

export default async function Home(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  return (
    <main className="flex items-center justify-center">
      <PageContainer className="flex flex-col gap-2 my-4">
        <h1 className="text-center text-2xl my-2">{t('labels.lengthHeader')}</h1>
        <CardContainer>
          <Converter units={lengthUnits} initialInputUnit="meters" initialOutputUnit="feet" rates={lengthRates} />
        </CardContainer>
        <Faq faqList={lengthFaqs[params.locale]} />
      </PageContainer>
    </main>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, 'home');
}
