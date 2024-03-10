'use client';

import { useRef, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { usePreview } from './usePreview';

type Props = {
  children: ReactNode;
};

export function Preview({ children }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);
  const { base64url } = usePreview(previewRef);

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: '320px',
        height: 'min-content',
        position: 'sticky',
        top: '88px',
      }}
    >
      <Box display="inline-block" position="relative">
        <Box>
          <Card ref={previewRef} sx={{ pb: 4 }}>
            {children}
          </Card>
        </Box>
        {base64url && (
          <Box
            position="absolute"
            top={0}
            sx={{ width: '100%', height: '100%' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              style={{ display: 'block', width: '100%', height: '100%' }}
              src={base64url}
              alt="preview"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
