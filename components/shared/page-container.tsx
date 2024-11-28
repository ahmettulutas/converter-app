import { cn } from '@/lib/utils/styles';
import { HTMLProps } from 'react';

export const PageContainer = (props: HTMLProps<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return <div className={cn('mx-auto max-w-[1400px] px-2 md:px-3 lg:px-5 w-full', className)} {...rest} />;
};
