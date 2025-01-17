import React, { Suspense } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function WithSuspense({ children }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
}
