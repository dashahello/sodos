import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useStoreState } from 'easy-peasy';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Nav() {
  const history = useHistory();

  const { isExact: isHome } = useRouteMatch('/');

  const currentUser = useStoreState((s) => s.currentUser);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {isHome ? (
              <Typography>Sodos</Typography>
            ) : (
              <IconButton onClick={() => history.goBack()}>
                <ArrowBackIosNewIcon style={{ color: 'white' }} />
              </IconButton>
            )}

            {/* <div style={{ flexGrow: 1 }}></div> */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              {history.location.pathname}
            </Typography>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon style={{ color: 'white' }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {!currentUser ? (
              <>
                <ListItem button component={Link} to="/login">
                  <ListItemIcon>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>

                <ListItem button component={Link} to="/register">
                  <ListItemIcon>
                    <PersonAddAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            ) : (
              <ListItem button component={Link} to="/logout">
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
