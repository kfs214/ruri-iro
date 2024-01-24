'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import ThemeRegistry from '@/providers/ThemeRegistry/ThemeRegistry';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <ThemeRegistry>{children}</ThemeRegistry>
    </LocalizationProvider>
  );
}
