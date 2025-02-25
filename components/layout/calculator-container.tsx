import { FaqProps } from '@/components/shared/faq';
import { lazy, ReactNode, Suspense } from 'react';

type CalculatorContainerProps = {
  faqProps: FaqProps;
  calculator: ReactNode;
  customSkeleton?: ReactNode;
};
const Faq = lazy(() => import('@/components/shared/faq'));

export default function CalculatorContainer(props: CalculatorContainerProps) {
  const { faqProps, calculator, customSkeleton } = props;
  const CalculatorSkeleton = customSkeleton || <>Loading...</>;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_440px]">
      <div className="space-y-6 mx-auto w-full">
        <Suspense fallback={CalculatorSkeleton}>{calculator}</Suspense>
      </div>
      <Suspense fallback={<>Loading...</>}>
        <Faq {...{ ...faqProps, containerClasses: 'mx-auto h-fit' }} />
      </Suspense>
    </div>
  );
}
