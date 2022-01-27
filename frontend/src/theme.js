import { createTheme } from '@mui/material';

export default createTheme({
  props: {
    MuiUseMediaQuery: {
      noSsr: true
    }
  },
  body: {
    background: '#ffffff'
  },
  app: {
    background: '#d9d9d9'
  },
  typography: {
    fontFamily: "'Roboto', sans-serif"
  },
  palette: {
    type: 'light',
    primary: {
      main: '#cb1bf1'
    },
    secondary: {
      main: '#f11b8c'
    },
    background: {
      main: '#f5f5f5',
      medium: '#181818',
      paper: '#f2f2f2',
      paperDark: '#d9d9d9'
    },
    success: {
      main: '#55B058'
    }
  }
});
