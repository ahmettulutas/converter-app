import { LoadingSpinner } from '@/components/shared/loading-spinner';

import React from 'react';

export default function Loading() {
  return (
    <main className="flex h-screen flex-col items-center justify-between relative mb-12 md:mb-0">
      <LoadingSpinner />
    </main>
  );
}
