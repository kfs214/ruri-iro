'use client';

import React, { ReactNode } from 'react';

import CakeIcon from '@mui/icons-material/Cake';
import PlaceIcon from '@mui/icons-material/Place';
import VillaIcon from '@mui/icons-material/Villa';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useOverviewStore } from '@/store';

type ItemProps = {
  icon: ReactNode;
  children: ReactNode;
};

type OverviewProps = {
  DOB: string;
  occupation: string;
  location: string;
};

function Item({ icon, children }: ItemProps) {
  return (
    <Box sx={{ display: 'flex', minWidth: 0 }}>
      {icon}
      <Typography
        variant="subtitle1"
        component="span"
        align="left"
        minWidth={0}
      >
        {children}
      </Typography>
    </Box>
  );
}

// TODO 長さによって折り返し時にはみ出る
export function OverviewDOMComponent({
  DOB,
  occupation,
  location,
}: OverviewProps) {
  return (
    // TODO 古いブラウザに対応。flex-gap使わない実装
    // TODO 英字が連続した際の折り返し
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {DOB && <Item icon={<CakeIcon />}>{DOB}</Item>}
      {occupation && <Item icon={<VillaIcon />}>{occupation}</Item>}
      {location && <Item icon={<PlaceIcon />}>{location}</Item>}
    </Box>
  );
}

export function Overview() {
  const { DOB, occupation, location } = useOverviewStore();

  return (
    <OverviewDOMComponent
      DOB={DOB}
      occupation={occupation}
      location={location}
    />
  );
}
