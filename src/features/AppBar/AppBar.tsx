'use client';

import React from 'react';

import MUIAppBar from '@mui/material/AppBar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { metadata } from '@/const';
import { useDataLayer, useLayout } from '@/hooks';
import { useAppStore } from '@/store';

// TODO 連打するとエラー出る
// Uncaught (in promise) TypeError: Cannot read properties of null (reading 'ownerDocument')
function TogglePreviewSwitch() {
  const { showPreview, setShowPreview } = useAppStore();
  const dataLayer = useDataLayer({ componentName: 'AppBar' });

  const handleChange = (_: unknown, checked: boolean) => {
    setShowPreview(checked);
    dataLayer.pushEvent('togglePreviewSwitch', { checked });
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={showPreview}
          onChange={handleChange}
          color="secondary"
          inputProps={{ 'aria-label': 'toggle-preview-switch' }}
        />
      }
      label="👀"
    />
  );
}

export function AppBar() {
  const { isPC } = useLayout();

  return (
    <MUIAppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar>
        <Image src="/images/funchan.svg" width={32} height={32} alt="logo" />
        <Typography
          variant="h6"
          noWrap
          component="h1"
          ml={1}
          sx={{ flexGrow: 1, color: 'white', fontWeight: 'bold' }}
        >
          {metadata.title}
        </Typography>
        {!isPC && <TogglePreviewSwitch />}
      </Toolbar>
    </MUIAppBar>
  );
}
