'use client';

import React, { ReactNode } from 'react';

import CakeIcon from '@mui/icons-material/Cake';
import PlaceIcon from '@mui/icons-material/Place';
import VillaIcon from '@mui/icons-material/Villa';
import Box from '@mui/material/Box';

import { useOverviewStore } from '@/store';

type ItemProps = {
  icon: ReactNode;
  children: ReactNode;
};

type OverviewProps = {
  shownDOB: string;
  occupation?: string;
  location?: string;
};

function Item({ icon, children }: ItemProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      {icon}
      {/* TODO Typography当てる */}
      {children}
    </Box>
  );
}

export function OverviewDOMComponent({
  shownDOB,
  occupation,
  location,
}: OverviewProps) {
  return (
    // TODO 古いブラウザに対応。flex-gap使わない実装
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {shownDOB && <Item icon={<CakeIcon />}>{shownDOB}</Item>}
      {occupation && <Item icon={<VillaIcon />}>{occupation}</Item>}
      {location && <Item icon={<PlaceIcon />}>{location}</Item>}
    </Box>
  );
}

export function Overview() {
  const { shownDOB, occupation, location } = useOverviewStore();

  return (
    <OverviewDOMComponent
      shownDOB={shownDOB}
      occupation={occupation}
      location={location}
    />
  );
}
