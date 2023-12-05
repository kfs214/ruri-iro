'use client';

import React, { ReactNode } from 'react';

import Typography from '@mui/material/Typography';

import { useNameStore } from '@/store';

type StyledNameProps = {
  children: ReactNode;
};

// TODO 初期値空文字入れる。
// app-index.js:31 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
type Props = {
  fullName: string;
  preferredName?: string;
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

export function Name() {
  const { fullName, preferredName } = useNameStore();

  return <NameDOMComponent fullName={fullName} preferredName={preferredName} />;
}
