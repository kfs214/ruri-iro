import { createTheme, styled } from '@mui/material/styles';

export const FlexUl = styled('ul')`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  gap: ${createTheme().spacing(1)};
`;
