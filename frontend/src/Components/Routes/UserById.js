import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Loader from '../Loader';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import getPrettyDateTimeString from '../../helpers/getPrettyDateTimeString';

const TITLE_MAX_LENGTH = 30;
const DESCRIPTION_MAX_LENGTH = 100;

function UserById() {
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const history = useHistory();
  const theme = useTheme();

  const currentUser = useStoreState((s) => s.currentUser);

  const userById = useStoreState((s) => s.userById);

  const fetchUserById = useStoreActions((a) => a.fetchUserById);
  const setUserById = useStoreActions((a) => a.setUserById);

  useEffect(() => {
    fetchUserById({
      userId: params.userId,
      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
        history.goBack();
      },
      onSuccess: () => {},
    });

    return () => {
      setUserById(null);
    };
  }, []);

  return !userById ? (
    <Loader />
  ) : (
    <>
      <Paper style={{ padding: theme.spacing(2) }}>
        {currentUser.id === userById.id ? <OwnerProfile /> : <Profile />}
      </Paper>
      <Tasks />
    </>
  );
}

function Tasks() {
  const userById = useStoreState((s) => s.userById);

  const theme = useTheme();

  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);

  const [taskDialogOpenForId, setTaskDialogOpenForId] = useState(null);

  return (
    <>
      <div style={{ marginTop: theme.spacing(4) }}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5">Tasks</Typography>
          </div>

          <IconButton
            onClick={() => setCreateTaskDialogOpen(true)}
            style={{ marginLeft: theme.spacing(1) }}
          >
            <AddIcon
              style={{
                fontSize: 40,
              }}
            />
          </IconButton>
        </div>
        {userById.tasks.length === 0 ? (
          <Typography>You don't have any tasks :(</Typography>
        ) : (
          userById.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              setTaskDialogOpenForId={setTaskDialogOpenForId}
            />
          ))
        )}
      </div>
      <TaskDialog
        open={!!taskDialogOpenForId}
        setTaskDialogOpenForId={setTaskDialogOpenForId}
        taskId={taskDialogOpenForId}
      />

      <CreateTaskDialog
        open={createTaskDialogOpen}
        setOpen={setCreateTaskDialogOpen}
      />
    </>
  );
}

function TaskDialog({ open, setTaskDialogOpenForId, taskId }) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const userById = useStoreState((s) => s.userById);

  const handleClose = () => setTaskDialogOpenForId(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);

  const updateTaskById = useStoreActions((a) => a.updateTaskById);

  function onSaveClick() {
    const toSubmit = {
      title,
      description,
      done,
    };

    updateTaskById({
      userId: userById.id,
      taskId: taskId,
      toSubmit,
      onSuccess: () => {
        enqueueSnackbar('Task was updated :)', { variant: 'success' });
        handleClose();
      },
      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
      },
    });
  }

  const [task, setTask] = useState(null);

  const fetchTaskById = useStoreActions((a) => a.fetchTaskById);

  useEffect(() => {
    if (taskId) {
      fetchTaskById({
        userId: userById.id,
        taskId: taskId,
        onSuccess: (task) => {
          setTask(task);
          setTitle(task.title);
          setDescription(task.description);
          setDone(task.done);
        },
        onError: (message) => {
          enqueueSnackbar(message, { variant: 'error' });
        },
      });
    }
  }, [taskId]);

  const deleteTaskById = useStoreActions((a) => a.deleteTaskById);

  function onDeleteClick() {
    if (window.confirm('Are you sure? ')) {
      deleteTaskById({
        userId: userById.id,
        taskId: taskId,
        onSuccess: () => {
          enqueueSnackbar('Task was deleted :)', { variant: 'success' });
          handleClose();
        },
        onError: (message) => {
          enqueueSnackbar(message, { variant: 'error' });
        },
      });
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Task</DialogTitle>
      {!task ? (
        <Loader />
      ) : (
        <>
          <DialogContent>
            <DialogContentText style={{ marginBottom: theme.spacing(2) }}>
              Created by: <b>{task.author.username}</b> at{' '}
              {getPrettyDateTimeString(task.createdAt)}
              <br />
              {task.modifier ? (
                <>
                  Modified by: <b>{task.modifier.username}</b> at{' '}
                  {getPrettyDateTimeString(task.updatedAt)}
                </>
              ) : null}
            </DialogContentText>

            <TextField
              value={title}
              onChange={(evt) => {
                if (evt.target.value.length <= TITLE_MAX_LENGTH) {
                  setTitle(evt.target.value);
                }
              }}
              fullWidth
              type="text"
              label={`Title ${title.length} / ${TITLE_MAX_LENGTH}`}
              style={{ marginTop: theme.spacing(2) }}
            />

            <TextField
              value={description}
              onChange={(evt) => {
                if (evt.target.value.length <= DESCRIPTION_MAX_LENGTH) {
                  setDescription(evt.target.value);
                }
              }}
              fullWidth
              multiline
              rows={5}
              type="text"
              label={`Description ${description.length} / ${DESCRIPTION_MAX_LENGTH}`}
              style={{ marginTop: theme.spacing(1) }}
            />

            <FormControlLabel
              style={{ marginLeft: 0, marginTop: theme.spacing(2) }}
              control={
                <Switch
                  color="primary"
                  checked={done}
                  onChange={(evt) => setDone(evt.target.checked)}
                />
              }
              label="Done"
              labelPlacement="start"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onDeleteClick} variant="contained" color="error">
              Delete
            </Button>
            <div style={{ flexGrow: 1 }} />
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onSaveClick} variant="contained">
              Save
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

function CreateTaskDialog({ open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const userById = useStoreState((s) => s.userById);

  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createTask = useStoreActions((a) => a.createTask);

  function onCreateClick() {
    const toSubmit = {
      title,
      description,
    };

    createTask({
      userId: userById.id,
      toSubmit,
      onSuccess: () => {
        enqueueSnackbar('Task was created :)', { variant: 'success' });
        setTitle('');
        setDescription('');
        handleClose();
      },
      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
      },
    });
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a task</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
        </DialogContentText> */}

        <TextField
          value={title}
          onChange={(evt) => {
            if (evt.target.value.length <= TITLE_MAX_LENGTH) {
              setTitle(evt.target.value);
            }
          }}
          fullWidth
          type="text"
          label={`Title ${title.length} / ${TITLE_MAX_LENGTH}`}
          style={{ marginTop: theme.spacing(2) }}
        />

        <TextField
          value={description}
          onChange={(evt) => {
            if (evt.target.value.length <= DESCRIPTION_MAX_LENGTH) {
              setDescription(evt.target.value);
            }
          }}
          fullWidth
          multiline
          rows={5}
          type="text"
          label={`Description ${description.length} / ${DESCRIPTION_MAX_LENGTH}`}
          style={{ marginTop: theme.spacing(2) }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onCreateClick}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

function Task({ task, setTaskDialogOpenForId }) {
  const theme = useTheme();

  return (
    <Paper
      onClick={() => setTaskDialogOpenForId(task.id)}
      style={{
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        cursor: 'pointer',
        backgroundColor: task.done
          ? theme.palette.success.light
          : theme.palette.warning.light,
      }}
    >
      <Typography variant="h6">{task.title}</Typography>
      <Typography>{task.description}</Typography>

      <Typography>Done: {task.done ? 'true' : 'false'}</Typography>
      <Divider style={{ margin: `${theme.spacing(1)} 0` }} />
      <Typography>
        Created at: {getPrettyDateTimeString(task.createdAt)}
      </Typography>

      {task.createdAt !== task.updatedAt ? (
        <Typography>
          Updated at: {getPrettyDateTimeString(task.updatedAt)}
        </Typography>
      ) : null}
    </Paper>
  );
}

function OwnerProfile() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const userById = useStoreState((s) => s.userById);
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
      userId: userById.id,
      toSubmit: toSubmit,
      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
      },
      onSuccess: () => enqueueSnackbar('Saved', { variant: 'success' }),
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>
        Profile was created at {getPrettyDateTimeString(userById.createdAt)}
      </Typography>

      <TextField
        type="text"
        label="Username"
        style={{ marginTop: theme.spacing(2) }}
        defaultValue={userById.username}
        inputProps={{ ref: usernameInput }}
      />
      <TextField
        type="text"
        label="Email"
        style={{ marginTop: theme.spacing(2) }}
        defaultValue={userById.email}
        inputProps={{ ref: emailInput }}
      />
      <TextField
        type="text"
        label="Status"
        style={{ marginTop: theme.spacing(2) }}
        defaultValue={userById.status}
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
  const theme = useTheme();
  const userById = useStoreState((s) => s.userById);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>
        Profile was created at {getPrettyDateTimeString(userById.createdAt)}
      </Typography>

      <Typography style={{ marginTop: theme.spacing(2) }}>
        Username: {userById.username}
      </Typography>
      <Typography style={{ marginTop: theme.spacing(2) }}>
        Email: {userById.email}
      </Typography>
      <Typography style={{ marginTop: theme.spacing(2) }}>
        Status: {userById.status}
      </Typography>
    </div>
  );
}

export default UserById;
