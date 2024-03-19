'use client';

import React from 'react';

import ForumIcon from '@mui/icons-material/Forum';
import GitHubIcon from '@mui/icons-material/GitHub';
import MUIAppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { aboutApp } from '@/const';

export function AppBar() {
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
          {aboutApp.title}
        </Typography>

        {/* TODO 上下中央揃え */}
        <Link
          color="inherit"
          target="_blank"
          rel="noopener"
          href="https://docs.google.com/forms/d/e/1FAIpQLSd6ChVKkE6XWLKNpB6eLrrNQgxtw6Ppv75dUz_l4x-E-RnFTg/viewform?usp=sf_link"
        >
          <ForumIcon fontSize="large" />
        </Link>
        <Link
          color="inherit"
          target="_blank"
          rel="noopener"
          href="https://github.com/kfs214/ruri-iro"
        >
          <GitHubIcon fontSize="large" sx={{ ml: 1 }} />
        </Link>
      </Toolbar>
    </MUIAppBar>
  );
}
