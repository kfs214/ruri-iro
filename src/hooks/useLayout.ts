import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useLayout() {
  const theme = useTheme();
  const isPC = useMediaQuery(theme.breakpoints.up('md'));

  return { isPC };
}
