import React from 'react';

import { MainVisual } from './MainVisual';
import { Preview } from './Preview';
import { Tag } from './Tag';

export function ProfileSheet() {
  return (
    <Preview>
      <MainVisual />
      <Tag />
    </Preview>
  );
}
