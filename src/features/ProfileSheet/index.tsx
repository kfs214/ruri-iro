import React from 'react';

import { Name } from './Name';
import { Overview } from './Overview';
import { Preview } from './Preview';

export function ProfileSheet() {
  return (
    <Preview>
      <Name />
      <Overview />
    </Preview>
  );
}
