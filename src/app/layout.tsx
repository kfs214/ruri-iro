import * as React from 'react';

import Box from '@mui/material/Box';
import Script from 'next/script';

import { AppBar } from '@/features/AppBar';
import { AppProvider } from '@/providers/app';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        id="gtm"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.GTM_ID}')`,
        }}
      />
      <body>
        <noscript>
          <iframe
            title="gtm noscript"
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <AppProvider>
          <AppBar />
          <Box
            component="main"
            sx={{
              mt: ['56px', '64px'],
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
