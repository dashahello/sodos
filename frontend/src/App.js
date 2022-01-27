import { useTheme, IconButton } from '@mui/material';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Components/Nav.js';
import Register from './Components/Routes/Register.js';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarProvider } from 'notistack';
import { createRef, useEffect } from 'react';
import Login from './Components/Routes/Login';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Home from './Components/Routes/Home';
import Logout from './Components/Routes/Logout.js';
import UserById from './Components/Routes/UserById.js';
import Loader from './Components/Loader.js';
import Users from './Components/Routes/Users.js';

function App() {
  const theme = useTheme();
  console.log(theme);

  const notistackRef = createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  const currentUserLoading = useStoreState((s) => s.currentUserLoading);

  const fetchCurrentUser = useStoreActions((a) => a.fetchCurrentUser);

  console.log('currentUserLoading', currentUserLoading);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={5000}
      ref={notistackRef}
      action={(key) => (
        <IconButton onClick={onClickDismiss(key)}>
          <CloseIcon style={{ color: 'white' }} />
        </IconButton>
      )}
      preventDuplicate={true}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Router basename="/">
        <Nav />

        {currentUserLoading ? (
          <Loader />
        ) : (
          <div
            style={{
              maxWidth: theme.breakpoints.values.sm,
              margin: '0 auto',
              padding: theme.spacing(2),
            }}
          >
            <Switch>
              <Route exact={true} path={'/'} component={Home} />
              <Route exact={true} path={'/login'} component={Login} />
              <Route exact={true} path={'/register'} component={Register} />
              <Route exact={true} path={'/logout'} component={Logout} />
              <Route
                exact={true}
                path={'/users/:userId'}
                component={UserById}
              />

              <Route exact={true} path={'/users'} component={Users} />
              <Route component={NotFound} />
            </Switch>
          </div>
        )}
      </Router>
    </SnackbarProvider>
  );
}

function NotFound() {
  return <div>NotFound</div>;
}

export default App;
