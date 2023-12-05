'use client';

import React from 'react';

import MUIAppBar from '@mui/material/AppBar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { metadata } from '@/const';
import { useAppStore } from '@/store';

export function AppBar() {
  const { showPreview, setShowPreview } = useAppStore();
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
        <FormControlLabel
          control={
            //  TODO 色が溶けるので修正
            <Switch
              checked={showPreview}
              onChange={setShowPreview}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="👀"
        />
      </Toolbar>
    </MUIAppBar>
  );
}
