'use client';

import 'dayjs/locale/ja';

import { useEffect } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { WebVitals } from '@/components';
import { useDataLayer } from '@/hooks';
import ThemeRegistry from '@/providers/ThemeRegistry/ThemeRegistry';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const dataLayer = useDataLayer({ componentName: 'AppProvider' });

  useEffect(() => {
    if (!dataLayer) return;

    const originalConsoleError = window.console.error;
    function onUnhandledRejection({ reason }: { reason: unknown }) {
      dataLayer.pushEvent('unhandledPromiseRejection', { reason });
    }
    function onError({ error }: { error: unknown }) {
      dataLayer.pushEvent('uncaughtException', { error });
    }

    window.console.error = (...error) => {
      originalConsoleError(...error);
      dataLayer.pushEvent('consoleError', { error });
    };
    window.addEventListener('unhandledrejection', onUnhandledRejection);
    window.addEventListener('error', onError);

    // eslint-disable-next-line consistent-return
    return () => {
      window.console.error = originalConsoleError;
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
      window.removeEventListener('error', onError);
    };
  }, [dataLayer]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <WebVitals />
      <ThemeRegistry>{children}</ThemeRegistry>
    </LocalizationProvider>
  );
}
