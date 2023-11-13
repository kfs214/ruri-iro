import Box from '@mui/material/Box';
import * as React from 'react';
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
              flexGrow: 1,
              bgcolor: 'background.default',
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
