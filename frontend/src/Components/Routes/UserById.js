import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Loader from '../Loader';
import { Button, Paper, TextField, Typography, useTheme } from '@mui/material';

function UserById() {
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const history = useHistory();
  const theme = useTheme();

  const currentUser = useStoreState((s) => s.currentUser);

  const [user, setUser] = useState(null);
  const fetchUserById = useStoreActions((a) => a.fetchUserById);

  useEffect(() => {
    fetchUserById({
      userId: params.userId,
      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
        history.goBack();
      },
      onSuccess: (user) => {
        setUser(user);
      },
    });
  }, []);

  return !user ? (
    <Loader />
  ) : (
    <Paper style={{ padding: theme.spacing(2) }}>
      {currentUser.id === user.id ? <OwnerProfile /> : <Profile />}
    </Paper>
  );
}

function OwnerProfile() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const currentUser = useStoreState((s) => s.currentUser);
  const updateUserById = useStoreActions((a) => a.updateUserById);

  const usernameInput = useRef();
  const emailInput = useRef();
  const statusInput = useRef();
  const passwordNameInput = useRef();

  function onSaveClick() {
    const toSubmit = {
      username: usernameInput.current.value,
      email: emailInput.current.value,
      status: statusInput.current.value,
    };

    if (passwordNameInput.current.value.length > 0) {
      toSubmit.password = passwordNameInput.current.value;
    }

    updateUserById({
      userId: currentUser.id,
      toSubmit: toSubmit,
      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
      },
      onSuccess: () => enqueueSnackbar('Saved', { variant: 'success' }),
    });

    console.log(toSubmit);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>
        Profile was created at {new Date(currentUser.createdAt).toString()}
      </Typography>

      <TextField
        type="text"
        label="Username"
        style={{ marginTop: theme.spacing(2) }}
        defaultValue={currentUser.username}
        inputProps={{ ref: usernameInput }}
      />
      <TextField
        type="text"
        label="Email"
        style={{ marginTop: theme.spacing(2) }}
        defaultValue={currentUser.email}
        inputProps={{ ref: emailInput }}
      />
      <TextField
        type="text"
        label="Status"
        style={{ marginTop: theme.spacing(2) }}
        defaultValue={currentUser.status}
        inputProps={{ ref: statusInput }}
      />
      <TextField
        type="password"
        label="Password"
        style={{ marginTop: theme.spacing(2) }}
        inputProps={{ ref: passwordNameInput }}
      />

      <Button
        variant="contained"
        style={{ marginTop: theme.spacing(2) }}
        onClick={onSaveClick}
      >
        Save
      </Button>
    </div>
  );
}

function Profile() {
  return <></>;
}

export default UserById;
