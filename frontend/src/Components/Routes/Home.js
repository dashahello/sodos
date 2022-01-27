import { Button, Typography } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

function Home() {
  const currentUser = useStoreState((s) => s.currentUser);

  return !currentUser ? <NotLoggedInHome /> : <LoggedInHome />;
}

function LoggedInHome() {
  const currentUser = useStoreState((s) => s.currentUser);
  return (
    <>
      <Typography variant="h4"> Welcome {currentUser.username}</Typography>
      <Button variant="contained" component={Link} to="/users">
        Users
      </Button>
    </>
  );
}

function NotLoggedInHome() {
  return <Typography variant="h4">Login or register</Typography>;
}

export default Home;
