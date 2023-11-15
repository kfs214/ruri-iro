import React, { ReactNode } from 'react';

import CakeIcon from '@mui/icons-material/Cake';
import PlaceIcon from '@mui/icons-material/Place';
import VillaIcon from '@mui/icons-material/Villa';
import Box from '@mui/material/Box';
import { Dayjs } from 'dayjs';

import { useOverviewStore } from '@/store';

type DOB = {
  isCustomDOBEnabled: boolean;
  customDOB?: string;
  dayjsDOB: Dayjs | null;
};

type ItemProps = {
  icon: ReactNode;
  children: ReactNode;
};

type OverviewProps = {
  dateOfBirth: DOB;
  occupation?: string;
  location?: string;
};

function formatDOB({ isCustomDOBEnabled, customDOB, dayjsDOB }: DOB) {
  if (isCustomDOBEnabled && customDOB) {
    return customDOB;
  }

  if (!isCustomDOBEnabled && dayjsDOB) {
    return dayjsDOB.format('YYYY-MM-DD');
  }

  return '';
}

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
  dateOfBirth,
  occupation,
  location,
}: OverviewProps) {
  const shownDOB = formatDOB(dateOfBirth);

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
  const { isCustomDOBEnabled, customDOB, dayjsDOB, occupation, location } =
    useOverviewStore();

  return (
    <OverviewDOMComponent
      dateOfBirth={{ isCustomDOBEnabled, customDOB, dayjsDOB }}
      occupation={occupation}
      location={location}
    />
  );
}
