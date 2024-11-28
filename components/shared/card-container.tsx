import { cn } from '@/lib/utils/styles';
import { HTMLProps } from 'react';

export const CardContainer = (props: HTMLProps<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div className={cn('mx-auto rounded-md p-2 md:p-3 lg:p-5 w-full max-w-[450px] shadow-md', className)} {...rest} />
  );
};
