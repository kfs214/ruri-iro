import React from 'react';

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { MainVisual } from './MainVisual';
import { PersonalPerspective } from './PersonalPerspective';
import { Preview } from './Preview';
import { Tag } from './Tag';

export function ProfileSheet() {
  return (
    <Preview>
      <CardMedia>
        <MainVisual />
      </CardMedia>
      <CardContent>
        <Box display="grid" gridTemplateColumns="minmax(0,1fr)" gap={1}>
          <PersonalPerspective />
          <Tag />
        </Box>
      </CardContent>
    </Preview>
  );
}
