'use client';

import { useRef, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { usePreview } from './usePreview';

type Props = {
  children: ReactNode;
};

export function Preview({ children }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);
  const { base64url, handleShare } = usePreview(previewRef);
  return (
    <Box sx={{ py: 2 }}>
      <Box>
        <Button onClick={handleShare} variant="outlined">
          Share
        </Button>
      </Box>

      <Box position="relative" sx={{ mt: 2 }}>
        <Box sx={{ width: 320 }}>
          <Card ref={previewRef}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <CardContent>{children}</CardContent>
            </Box>
          </Card>
        </Box>
        {base64url && (
          <Box position="absolute" top={0} sx={{ height: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              style={{ display: 'block', width: 'auto', height: '100%' }}
              src={base64url}
              alt="preview"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
