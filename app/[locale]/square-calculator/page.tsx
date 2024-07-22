import { createTranslation } from '@/i18n';
import { SharedPageProps } from '../layout';

import { CardContainer } from '@/components/shared/card-container';
import { ResolvingMetadata } from 'next';
import { getDefaultMetaData } from '@/lib/seo';

import { SquareCalculator } from '@/components/pages/square-meter-calculator';

export default async function SquareCalculatorPage(props: SharedPageProps) {
  const { params } = props;
  const { t } = await createTranslation(params.locale, 'translation');
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl my-2">{t('weightHeader')}</h1>
      <CardContainer>
        <SquareCalculator />
      </CardContainer>
    </main>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, 'square');
}
