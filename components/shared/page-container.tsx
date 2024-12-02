import { cn } from '@/lib/utils/styles';
import { HTMLProps } from 'react';

export const PageContainer = (props: HTMLProps<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return <div className={cn('mx-auto max-w-[1400px] px-4 md:px-6 lg:px-12 w-full', className)} {...rest} />;
};
