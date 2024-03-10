'use client';

import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import { SwitchPreviewButton } from '@/components';
import { useLayout } from '@/hooks';
import { useAppStore } from '@/store';

function ShareDownload() {
  /* TODO シェアボタンをアイコンに */
  /* TODO シェアボタンの活性条件を詰める */
  // TODO イベントハンドラ等適用

  return (
    <>
      <Button
        // onClick={handleDownload}
        variant="outlined"
        // disabled={!fullName}
      >
        Download
      </Button>

      {!!navigator.canShare && (
        <Button
          // onClick={handleShare}
          variant="contained"
          // disabled={!fullName}
        >
          Share
        </Button>
      )}
    </>
  );
}

export function Footer() {
  const { isPC } = useLayout();
  const { showPreview } = useAppStore();

  return (
    <AppBar
      position="fixed"
      component="footer"
      sx={{ top: 'auto', bottom: 0, background: 'white' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* TODO 横並びGrid共通化 */}
        {/* Footer - Left */}
        <Box sx={{ display: 'grid', gap: 1, gridAutoFlow: 'column' }}>
          {!isPC && showPreview && <SwitchPreviewButton variant="back" />}
        </Box>

        {/* Footer - Right */}
        <Box sx={{ display: 'grid', gap: 1, gridAutoFlow: 'column' }}>
          {(isPC || showPreview) && <ShareDownload />}
          {!isPC && !showPreview && (
            <SwitchPreviewButton variant="showPreview" />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
