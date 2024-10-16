import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData } from '@/lib/seo';

import { Faq } from '@/components/shared/faq';
import { risingSignCalculatorFAQs } from '@/lib/constants/faq';
import { PageContainer } from '@/components/shared/page-container';
import RisingSignCalculator from '@/components/pages/rising-sign-calculator';

export default async function RisignSignCalculatorPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  return (
    <main className="flex flex-col items-center justify-center">
      <PageContainer className="flex flex-col gap-2 my-4">
        <h1 className="text-center text-2xl my-2">{t('labels.risingHeader')}</h1>
        <RisingSignCalculator currentLocale={params.locale} />
        <Faq faqList={risingSignCalculatorFAQs[params.locale]} />
      </PageContainer>
    </main>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, 'risingSignCalculator');
}
