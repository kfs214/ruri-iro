'use client';

import { useRef, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { TogglePreviewButton } from '@/components';
import { useLayout } from '@/hooks';
import { useNameStore } from '@/store';

import { usePreview } from './usePreview';

type Props = {
  children: ReactNode;
};

export function Preview({ children }: Props) {
  const { isPC } = useLayout();
  const { fullName } = useNameStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const { base64url, handleShare } = usePreview(previewRef);

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: '320px',
        height: 'min-content',
      }}
    >
      {/* TODO シェアボタンをアイコンに */}
      {/* TODO シェアボタンの活性条件を詰める */}
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Button
            onClick={handleShare}
            variant="contained"
            disabled={!fullName}
          >
            Share
          </Button>
        </Box>

        {!isPC && (
          <Box sx={{ ml: 1 }}>
            <TogglePreviewButton />
          </Box>
        )}
      </Box>

      <Box display="inline-block" position="relative">
        <Box>
          <Card ref={previewRef}>
            <CardContent>
              <Box display="grid" gridTemplateColumns="100%" gap={1}>
                {children}
              </Box>
            </CardContent>
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
