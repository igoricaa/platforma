'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster position="top-center" />
      {children}
    </ClerkProvider>
  );
} 