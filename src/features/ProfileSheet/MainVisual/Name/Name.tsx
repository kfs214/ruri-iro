'use client';

import React, { ReactNode, useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { useNameStore } from '@/store';

type StyledNameProps = {
  children: ReactNode;
};

type Props = {
  fullName: string;
  preferredName: string;
};

function StyledName({ children }: StyledNameProps) {
  return (
    <Typography variant="h4" component="p" align="center">
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

// TODO オートコンプリート
export function Name() {
  useEffect(() => {
    useNameStore.persist.rehydrate();
  }, []);

  const { fullName, preferredName } = useNameStore();

  return <NameDOMComponent fullName={fullName} preferredName={preferredName} />;
}
