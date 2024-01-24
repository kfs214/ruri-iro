import { Box, Typography } from '@mui/material';

import { FlexUl } from '@/components';
import { useTagStore } from '@/store';

export function Tag() {
  const { tags } = useTagStore();

  if (tags.length === 0) return null;

  return (
    <Box>
      <Typography variant="h5">#わたし</Typography>
      <FlexUl>
        {tags.map(({ tag, tagId }) => (
          <li key={tagId} style={{ minWidth: 0 }}>
            <Typography variant="body2">#{tag}</Typography>
          </li>
        ))}
      </FlexUl>
    </Box>
  );
}
