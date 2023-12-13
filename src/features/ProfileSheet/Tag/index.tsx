import { Box, Typography } from '@mui/material';

import { FlexUl } from '@/components';
import { useTagStore } from '@/store';

export function Tag() {
  const { tags } = useTagStore();

  return (
    <Box>
      <Typography variant="h5">#わたし</Typography>
      <FlexUl>
        {tags.map(({ tag, tagId }) => (
          <li key={tagId}>
            <Typography variant="body2">#{tag}</Typography>
          </li>
        ))}
      </FlexUl>
    </Box>
  );
}
