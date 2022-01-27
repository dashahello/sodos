import { Button, Typography, useTheme } from '@mui/material';
import { useStoreActions } from 'easy-peasy';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const logout = useStoreActions((a) => a.logout);

  function onLogoutClick() {
    logout({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: 'success' });
        history.replace('/');
      },

      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
      },
    });
  }
  return (
    <center>
      <Typography>See you later ;)</Typography>

      <Button
        variant="contained"
        onClick={onLogoutClick}
        style={{ marginTop: theme.spacing(2) }}
      >
        Logout
      </Button>
    </center>
  );
}
export default Logout;
