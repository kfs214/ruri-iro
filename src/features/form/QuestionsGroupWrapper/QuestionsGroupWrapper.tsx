import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';

type Props = {
  groupName: string;
  children: ReactNode;
};

export function QuestionsGroupWrapper({ groupName, children }: Props) {
  return (
    <Box>
      <Typography variant="h4" component="h2">
        {groupName}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
}