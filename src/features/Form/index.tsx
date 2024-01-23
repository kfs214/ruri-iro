import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';

import { useAppStore } from '@/store/useAppStore';

import { ImageGroup } from './ImageGroup';
import { NameInputGroup } from './NameInputGroup';
import { OverviewQuestionsGroup } from './OverviewQuestionsGroup';
import { PersonalPerspectivesGroup } from './PersonalPerspectivesGroup';
import { TagGroup } from './TagGroup';

export function Form() {
  const { formScrollPosition, setFormScrollPosition } = useAppStore();
  const scrollY = useRef(0);

  const updateScroll = () => {
    scrollY.current = window.scrollY;
  };

  useEffect(() => {
    window.scrollTo(0, formScrollPosition);
    window.addEventListener('scroll', updateScroll);

    return () => {
      setFormScrollPosition(scrollY.current);
      window.removeEventListener('scroll', updateScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="grid" gap={3}>
      <NameInputGroup />
      <ImageGroup />
      <OverviewQuestionsGroup />
      <PersonalPerspectivesGroup />
      <TagGroup />
    </Box>
  );
}
