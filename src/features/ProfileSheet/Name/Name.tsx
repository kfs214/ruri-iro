import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';

type Props = {
  fullName: string;
  preferredName?: string;
};

type StyledNameProps = {
  children: ReactNode;
};

function StyledName({ children }: StyledNameProps) {
  return (
    <Typography variant="h3" component="p" align="center">
      {children}
    </Typography>
  );
}

export function Name({ fullName, preferredName }: Props) {
  return (
    <>
      <StyledName>{fullName}</StyledName>
      {preferredName && <StyledName>({preferredName})</StyledName>}
    </>
  );
}
