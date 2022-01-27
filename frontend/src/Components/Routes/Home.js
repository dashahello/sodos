import { ThemeContext } from '@emotion/react';
import { Button, Typography, useTheme } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

function Home() {
  const currentUser = useStoreState((s) => s.currentUser);

  return !currentUser ? <NotLoggedInHome /> : <LoggedInHome />;
}

function LoggedInHome() {
  const theme = useTheme();
  const currentUser = useStoreState((s) => s.currentUser);
  return (
    <div
      style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <Typography variant="h4" style={{ marginTop: theme.spacing(2) }}>
        {' '}
        Welcome {currentUser.username}
      </Typography>
      <SquareButton
        to={`/users/${currentUser.id}`}
        text="My Profile"
        style={{ marginTop: theme.spacing(4) }}
      />
      <SquareButton
        to={'/users'}
        text="Users"
        style={{ marginTop: theme.spacing(4) }}
      />
    </div>
  );
}

function SquareButton({ to, text, style = {} }) {
  return (
    <Button
      variant="contained"
      component={Link}
      to={to}
      style={{
        width: 160,
        height: 160,
        margin: '0 auto',
        fontWeight: 'bold',
        ...style,
      }}
    >
      {text}
    </Button>
  );
}

function NotLoggedInHome() {
  return <Typography variant="h4">Login or register</Typography>;
}

export default Home;
