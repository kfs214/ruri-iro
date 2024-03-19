import { useLayoutEffect, useRef } from 'react';

import Box from '@mui/material/Box';

import { useAppStore } from '@/store';

import { ImageGroup } from './ImageGroup';
import { NameInputGroup } from './NameInputGroup';
import { OverviewQuestionsGroup } from './OverviewQuestionsGroup';
import { PersonalPerspectivesGroup } from './PersonalPerspectivesGroup';
import { TagGroup } from './TagGroup';

export function Form() {
  const { formScrollPosition, setFormScrollPosition } = useAppStore();
  const scrollY = useRef(0);

  // TODO Show Preview / Backでスクロール位置が少し変わる
  function updateScroll() {
    scrollY.current = window.scrollY;
  }

  useLayoutEffect(() => {
    window.addEventListener('scroll', updateScroll);
    window.scrollTo(0, formScrollPosition);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      setFormScrollPosition(scrollY.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'grid', gap: 3, height: 'min-content' }}>
      <NameInputGroup />
      <ImageGroup />
      <OverviewQuestionsGroup />
      <PersonalPerspectivesGroup />
      <TagGroup />
    </Box>
  );
}
