import { SharedPageProps } from '../layout';

import { ResolvingMetadata } from 'next';
import { getDefaultMetaData, getLocalizedJsonLd } from '@/lib/seo';

import { JsonSchema } from '@/components/shared/json.ld';
import { Suspense, lazy } from 'react';

const SexualOrientationTest = lazy(() => import('@/components/pages/sexual-calculator'));
const pageKey = 'sexualIdentity';

export default async function RisignSignCalculatorPage(props: Readonly<SharedPageProps>) {
  const { params } = props;
  const pageSchema = await getLocalizedJsonLd(params.locale, pageKey);

  return (
    <>
      <article className="flex flex-col items-center justify-center">
        <Suspense fallback={<>Loading...</>}>
          <SexualOrientationTest currentLocale={params.locale} />
        </Suspense>
      </article>
      {pageSchema && <JsonSchema schema={pageSchema} />}
    </>
  );
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, pageKey);
}
