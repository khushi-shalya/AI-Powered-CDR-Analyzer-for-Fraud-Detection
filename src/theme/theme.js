// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f589',
    },
    secondary: {
      main: '#0df2ff',
    },
    background: {
      default: '#0a0e17',
      paper: '#101522',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a3b1c6',
    },
  },
  typography: {
    fontFamily: ['Outfit', 'Ubuntu', 'sans-serif'].join(','),
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
