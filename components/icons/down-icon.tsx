import { HTMLAttributes } from 'react';

export function DownIcon(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='m6.155 8.095 6.75 6.75-1.06 1.06-6.75-6.75 1.06-1.06zm11.69 0 1.06 1.06-4.875 4.875-1.06-1.06 4.875-4.875z'
        fill='currentColor'
      />
    </svg>
  );
}
