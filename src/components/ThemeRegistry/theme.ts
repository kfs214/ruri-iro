import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#004798',
    },
    secondary: {
      main: '#009398',
    },
    error: {
      main: '#980047',
    },
    warning: {
      main: '#985100',
    },
    info: {
      main: '#00b8c3',
    },
    success: {
      main: '#065c58',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
