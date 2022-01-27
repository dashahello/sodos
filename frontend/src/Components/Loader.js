import { CircularProgress, useTheme } from '@mui/material';

function Loader() {
  const theme = useTheme();

  return (
    <center>
      <CircularProgress
        style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
      />
    </center>
  );
}

export default Loader;
