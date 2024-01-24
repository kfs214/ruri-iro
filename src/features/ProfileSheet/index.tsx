import React from 'react';

import { MainVisual } from './MainVisual';
import { PersonalPerspective } from './PersonalPerspective';
import { Preview } from './Preview';
import { Tag } from './Tag';

export function ProfileSheet() {
  return (
    <Preview>
      <MainVisual />
      <PersonalPerspective />
      <Tag />
    </Preview>
  );
}
