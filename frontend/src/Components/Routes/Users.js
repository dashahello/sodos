import {
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../Loader';
import { useStoreActions, useStoreState } from 'easy-peasy';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';

function Users() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const history = useHistory();

  const currentUser = useStoreState((s) => s.currentUser);

  const [users, setUsers] = useState(null);
  const fetchAllUsers = useStoreActions((a) => a.fetchAllUsers);

  const [search, setSearch] = useState('');

  const [permissions, setPermissions] = useState(null);

  const fetchAllPermissionsByUserId = useStoreActions(
    (a) => a.fetchAllPermissionsByUserId,
  );

  const createPermission = useStoreActions((a) => a.createPermission);
  const deletePermissionById = useStoreActions((a) => a.deletePermissionById);

  useEffect(() => {
    if (!currentUser) return;

    fetchAllUsers({
      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
        history.replace('/');
      },
      onSuccess: (users) => {
        setUsers(users);
      },
    });

    fetchAllPermissionsByUserId({
      userId: currentUser.id,
      onError: (message) => {
        enqueueSnackbar(message, { variant: 'error' });
        history.replace('/');
      },
      onSuccess: (users) => {
        setPermissions(users);
      },
    });
  }, [currentUser]);

  return !users || !permissions ? (
    <Loader />
  ) : (
    <>
      <div style={{ display: 'flex' }}>
        {' '}
        <TextField
          style={{ flexGrow: 1 }}
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: theme.spacing(2),
          }}
        >
          <Typography style={{ textAlign: 'center' }}>
            Has
            <br />
            permission
          </Typography>
        </div>
      </div>

      <List>
        {users
          .filter((user) =>
            user.username.toLowerCase().includes(search.toLowerCase()),
          )
          .map((user) => (
            <ListItem
              key={user.id}
              button
              component={Link}
              to={`/users/${user.id}`}
              secondaryAction={
                user.id !== currentUser.id ? (
                  <Switch
                    checked={
                      !!permissions.find(
                        (permission) => permission.visitorId === user.id,
                      )
                    }
                    onChange={(evt) => {
                      if (evt.target.checked) {
                        createPermission({
                          visitorId: user.id,
                          onSuccess: (permission) => {
                            setPermissions([...permissions, permission]);
                          },

                          onError: (message) => {
                            enqueueSnackbar(message, { variant: 'error' });
                          },
                        });
                      } else {
                        const _permission = permissions.find(
                          (permission) => permission.visitorId === user.id,
                        );

                        deletePermissionById({
                          visitorId: user.id,
                          permissionId: _permission.id,
                          onSuccess: () => {
                            setPermissions(
                              permissions.filter(
                                (permission) =>
                                  permission.id !== _permission.id,
                              ),
                            );
                          },
                          onError: (message) => {
                            enqueueSnackbar(message, { variant: 'error' });
                          },
                        });
                      }
                    }}
                    onClick={(evt) => {
                      evt.stopPropagation();
                    }}
                  />
                ) : null
              }
            >
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={user.username} />
            </ListItem>
          ))}
      </List>
    </>
  );
}
export default Users;
