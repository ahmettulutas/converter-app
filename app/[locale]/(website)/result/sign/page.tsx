'use client';
import SignResult from '@/components/pages/rising-sign-calculator/result';

import { notFound, useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const sign = searchParams.get('sign');
  if (!sign) return notFound();
  return (
    <main className="mx-auto max-w-md">
      <SignResult risingSign={sign} />
    </main>
  );
}
