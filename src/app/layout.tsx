import * as React from 'react';

import Box from '@mui/material/Box';

import { AppBar } from '@/features/AppBar';
import { AppProvider } from '@/providers/app';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>
          <AppBar />
          <Box
            component="main"
            sx={{
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </AppProvider>
      </body>
    </html>
  );
}
