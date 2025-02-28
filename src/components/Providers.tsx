'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Next13ProgressBar } from 'next13-progressbar';
import ToastProvider from './Toast/ToastProvider';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ToastProvider>
          <Next13ProgressBar 
            height="4px"
            color="#10b981"
            options={{ showSpinner: true }}
            showOnShallow
          />
          {children}
        </ToastProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
