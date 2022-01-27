import { createTheme } from '@mui/material';
import { green, orange } from '@mui/material/colors';

export default createTheme({
  props: {
    MuiUseMediaQuery: {
      noSsr: true,
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  palette: {
    type: 'light',
    primary: {
      main: '#cb1bf1',
    },

    success: {
      main: green[500],
      ligth: green[200],
    },

    warning: {
      main: orange[500],
      ligth: orange[200],
    },
  },
});
