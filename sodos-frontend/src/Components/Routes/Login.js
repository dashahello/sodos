import { Button, TextField, Typography, useTheme } from '@mui/material';
import { useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const login = useStoreActions((a) => a.login);

  const theme = useTheme();

  const usernameInput = useRef();
  const passwordInput = useRef();

  function onLoginClick() {
    const toSubmit = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };

    login({
      toSubmit,
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: 'success' });
        history.replace('/');
      },

      onError: (message) => enqueueSnackbar(message, { variant: 'error' }),
    });
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
      }}
    >
      <Typography variant="h3">Login to your Sodos account</Typography>

      <TextField
        type="text"
        label="Username"
        style={{ marginTop: theme.spacing(2) }}
        inputProps={{
          ref: usernameInput,
        }}
      />

      <TextField
        type="password"
        label="Password"
        style={{ marginTop: theme.spacing(2) }}
        inputProps={{
          ref: passwordInput,
        }}
      />

      <Button
        variant="contained"
        style={{ marginTop: theme.spacing(2) }}
        onClick={onLoginClick}
      >
        Login
      </Button>
    </div>
  );
}
export default Login;
