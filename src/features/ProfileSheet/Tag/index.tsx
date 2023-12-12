import { Typography } from '@mui/material';

import { FlexUl } from '@/components';
import { useTagStore } from '@/store/useTagStore';

export function Tag() {
  const { tags } = useTagStore();

  return (
    <FlexUl>
      {tags.map(({ tag, tagId }) => (
        <li key={tagId}>
          <Typography>#{tag}</Typography>
        </li>
      ))}
    </FlexUl>
  );
}
