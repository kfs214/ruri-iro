import { FormEvent, useCallback, useRef } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { createTheme, styled } from '@mui/material/styles';

import { Tag, useTagStore } from '@/store/useTagStore';

import { QuestionsGroupWrapper } from '../QuestionsGroupWrapper';

type TagLiProps = {
  onDelete: (tagId: string) => void;
} & Tag;

// TODO 長い場合は省略
function TagLi({ tag, onDelete }: TagLiProps) {
  return (
    <li>
      <Chip label={tag} onDelete={onDelete} />
    </li>
  );
}

function Tags() {
  const { tags, setTags } = useTagStore();

  const handleDelete = useCallback(
    (deletedTagId: string) => {
      setTags(tags.filter(({ tagId }) => tagId !== deletedTagId));
    },
    [tags, setTags],
  );

  return tags.map((tag) => (
    <TagLi
      onDelete={() => {
        handleDelete(tag.tagId);
      }}
      key={tag.tagId}
      {...tag}
    />
  ));
}

// TODO 溶け込ます&&BackSpaceで最後の要素を消す

function TagForm() {
  const { tags, setTags } = useTagStore();
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!textFieldRef.current) return;

      const value = textFieldRef.current.value.trim();
      if (!value) return;
      if (tags.map(({ tag }) => tag).includes(value)) return;

      setTags([...tags, { tag: value, tagId: crypto.randomUUID() }]);
      textFieldRef.current.value = '';
    },
    [tags, setTags],
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        inputRef={textFieldRef}
        name="tag"
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
      />
    </form>
  );
}

const StyledUl = styled('ul')`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  gap: ${createTheme().spacing(1)};
`;

const StyledFormLi = styled('li')`
  min-width: 0;
  flex-grow: 1;
`;

export default function TagGroup() {
  return (
    <QuestionsGroupWrapper groupName="あなたを表わすハッシュタグ">
      <Box
        p={1}
        sx={{
          border: 1,
          borderColor: 'rgba(0,0,0,.2)',
          borderRadius: '4px',
        }}
      >
        <StyledUl>
          <Tags />
          <StyledFormLi key="li">
            <TagForm />
          </StyledFormLi>
        </StyledUl>
      </Box>
    </QuestionsGroupWrapper>
  );
}
