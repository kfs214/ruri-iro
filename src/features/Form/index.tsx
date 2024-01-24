import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';

import { TogglePreviewButton } from '@/components';
import { useLayout } from '@/hooks';
import { useAppStore } from '@/store';

import { ImageGroup } from './ImageGroup';
import { NameInputGroup } from './NameInputGroup';
import { OverviewQuestionsGroup } from './OverviewQuestionsGroup';
import { PersonalPerspectivesGroup } from './PersonalPerspectivesGroup';
import { TagGroup } from './TagGroup';

export function Form() {
  const { formScrollPosition, setFormScrollPosition } = useAppStore();
  const scrollY = useRef(0);
  const { isPC } = useLayout();

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
    <Box sx={{ display: 'grid', gap: 3, height: 'min-content' }}>
      <NameInputGroup />
      <ImageGroup />
      <OverviewQuestionsGroup />
      <PersonalPerspectivesGroup />
      <TagGroup />
      {/* TODO Boxの統一性 */}
      {!isPC && (
        <Box>
          <TogglePreviewButton />
        </Box>
      )}
    </Box>
  );
}
