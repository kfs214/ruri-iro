import React, { ReactNode } from 'react';

import Typography from '@mui/material/Typography';

import { useNameStore } from '@/store';

type StyledNameProps = {
  children: ReactNode;
};

type Props = {
  fullName: string;
  preferredName?: string;
};

function StyledName({ children }: StyledNameProps) {
  return (
    <Typography variant="h3" component="p" align="center">
      {children}
    </Typography>
  );
}

export function NameDOMComponent({ fullName, preferredName }: Props) {
  return (
    <>
      <StyledName>{fullName}</StyledName>
      {preferredName && <StyledName>({preferredName})</StyledName>}
    </>
  );
}

export function Name() {
  const { fullName, preferredName } = useNameStore();

  return <NameDOMComponent fullName={fullName} preferredName={preferredName} />;
}
