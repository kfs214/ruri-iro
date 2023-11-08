import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'RUri-iro',
  description:
    ' Generate personalized Profile Sheets with ease by completing a user-friendly form, featuring your photo and responses to selected questions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar>
              <Image
                src="/images/funchan.svg"
                width={32}
                height={32}
                alt="logo"
              />
              <Typography
                variant="h6"
                noWrap
                component="h1"
                ml={1}
                sx={{ flexGrow: 1, color: 'white', fontWeight: 'bold' }}
              >
                {metadata.title}
              </Typography>
            </Toolbar>
          </AppBar>
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
        </ThemeRegistry>
      </body>
    </html>
  );
}
