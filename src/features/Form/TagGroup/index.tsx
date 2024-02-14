import {
  FormEvent,
  MouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTheme, styled } from '@mui/material/styles';

import { FlexUl } from '@/components';
import { Tag, useTagStore } from '@/store';

import { QuestionsGroupWrapper } from '../QuestionsGroupWrapper';

type TagLiProps = {
  onDelete: (tagId: string) => void;
} & Tag;

let nextTagId = 0;

const StyledFormLi = styled('li')`
  min-width: 0;
  flex-grow: 1;
`;

// TODO 長い場合は省略
function TagLi({ tag, onDelete }: TagLiProps) {
  return (
    <li style={{ overflow: 'hidden' }}>
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

  // TODO keyの警告が出る. latestTagId永続化
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

// TODO BackSpaceで最後の要素を消す
const TagForm = forwardRef<
  HTMLInputElement,
  { handleSubmit: (e?: FormEvent<HTMLFormElement>) => void }
>(({ handleSubmit }, ref) => (
  <StyledFormLi key="li">
    <form onSubmit={handleSubmit}>
      <TextField
        inputRef={ref}
        onBlur={() => {
          handleSubmit();
        }}
        name="tag"
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
          // TODO iOS safariで、returnアイコン押下後に次のタグが入力できないバージョンがある（16系）
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <KeyboardReturnIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  </StyledFormLi>
));
TagForm.displayName = 'TagForm';

export function TagGroup() {
  useEffect(() => {
    useTagStore.persist.rehydrate();
  }, []);
  const { tags, setTags } = useTagStore();
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (!inputRef.current) return;

      const value = inputRef.current.value.trim();
      if (!value) return;
      if (tags.map(({ tag }) => tag).includes(value)) return;

      setTags([...tags, { tag: value, tagId: `${nextTagId}` }]);
      nextTagId += 1;
      inputRef.current.value = '';
    },
    [tags, setTags],
  );

  const handleClickTagsBox = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (document.activeElement === inputRef.current) return;

    inputRef.current?.focus();
  };

  return (
    <QuestionsGroupWrapper groupName="あなたを表わすハッシュタグ">
      <Box
        onMouseDown={handleClickTagsBox}
        p={1}
        sx={{
          cursor: 'text',
          border: 1,
          borderColor: 'rgba(0,0,0,.23)',
          borderRadius: '4px',
          ':focus-within': {
            // TODO dark mode対応時は修正
            border: 2,
            borderColor: theme.palette.primary.light,
            padding: `calc(${theme.spacing(1)} - 1px)`,
          },
        }}
      >
        <FlexUl>
          <Tags />
          <TagForm handleSubmit={handleSubmit} ref={inputRef} />
        </FlexUl>
      </Box>
    </QuestionsGroupWrapper>
  );
}
