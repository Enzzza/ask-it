import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import NotificationBell from './NotificationBell';
import { UserAvatar } from '../../avatar/UserAvatar';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import useCustomSnackbar from '../../utils/snackbar/useCustomSnackbar';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

export default function PrimarySearchAppBar() {
  const auth = useAuth();
  let history = useHistory();
  const classes = useStyles();
  const popupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });
  const snackbar = useCustomSnackbar()

  const signout = async () => {
    popupState.close();
    await auth.signout();
    snackbar.showInfo("Come again! :)","Close",()=>{})
  };

  const myAccount = () => {
    popupState.close();
    history.push("/account")
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' noWrap>
            <Button onClick={() => history.push('/')}>Home</Button>
          </Typography>
          

          <div className={classes.grow} />

          {auth.user ? (
            <div>
              <IconButton color='inherit'>
                <Badge badgeContent={0} color='secondary'>
                  <NotificationBell notifications={auth.offlineMsg} />
                </Badge>
              </IconButton>
              <IconButton {...bindTrigger(popupState)} color='inherit'>
                <UserAvatar
                  user={auth.user}
                />
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={myAccount}>My account</MenuItem>
                <MenuItem onClick={signout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button size='small' onClick={() => history.push('/sign-in')}>
                Sign in
              </Button>

              <Button size='small' onClick={() => history.push('/sign-up')}>
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
