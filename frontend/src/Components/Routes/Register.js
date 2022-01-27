import { Button, TextField, Typography, useTheme } from '@mui/material';
import { useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

function Register() {
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const register = useStoreActions((a) => a.register);

  const theme = useTheme();

  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  function onRegisterClick() {
    const toSubmit = {
      username: usernameInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };

    register({
      toSubmit,
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: 'success' });
        history.replace('/login');
      },

      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
      },
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
      <Typography variant="h3">Register a Sodos account</Typography>

      <TextField
        type="text"
        label="Username"
        style={{ marginTop: theme.spacing(2) }}
        inputProps={{
          ref: usernameInput,
        }}
      />
      <TextField
        type="email"
        label="Email"
        style={{ marginTop: theme.spacing(2) }}
        inputProps={{
          ref: emailInput,
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
        onClick={onRegisterClick}
      >
        Register
      </Button>
    </div>
  );
}
export default Register;
