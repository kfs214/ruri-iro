'use client';

import { useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import { SwitchPreviewButton } from '@/components';
import { useDataLayer, useLayout } from '@/hooks';
import { useAppStore } from '@/store';

import { useShare } from './useShare';

function Share() {
  /* TODO シェアボタンをアイコンに */
  /* TODO シェアボタンの活性条件を詰める */

  const { fullName, handleDownload, handleShare } = useShare();

  const dataLayer = useDataLayer({
    componentName: 'Footer',
  });

  const handleClickDownload = useCallback(() => {
    dataLayer.pushEvent('clickDownload');
    handleDownload();
  }, [dataLayer, handleDownload]);

  const handleClickShare = useCallback(() => {
    dataLayer.pushEvent('clickShare');
    handleShare();
  }, [dataLayer, handleShare]);

  return (
    <>
      <Button
        onClick={handleClickDownload}
        variant="outlined"
        disabled={!fullName}
      >
        Download
      </Button>

      {!!navigator.canShare && (
        <Button
          onClick={handleClickShare}
          variant="contained"
          disabled={!fullName}
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
          {(isPC || showPreview) && <Share />}
          {!isPC && !showPreview && (
            <SwitchPreviewButton variant="showPreview" />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
