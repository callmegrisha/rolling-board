import { Suspense } from 'react';

export const BasicSuspense = ({ component, ...props }) => (
  <Suspense {...props}>{component}</Suspense>
);
