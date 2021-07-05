import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import NotificationBell from './NotificationBell';
import NotificationList from './NotificationList';
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
  const accountPopupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });
  const notificationPopupState = usePopupState({variant:'popover', popupId:'userNotifications'})
  const snackbar = useCustomSnackbar();

  const signout = async () => {
    accountPopupState.close();
    let { msg, error } = await auth.signout();
    if (!error) {
      snackbar.showInfo(msg, 'Close', () => {});
    } else {
      snackbar.showError('Something bad happend! :/', 'Close', () => {});
    }
  };

  const myAccount = () => {
    accountPopupState.close();
    history.push('/account');
  };

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
              <IconButton {...bindTrigger(notificationPopupState)} color='inherit'>
                <NotificationBell notifications={auth.offlineMsg} />
              </IconButton>
              <Menu {...bindMenu(notificationPopupState)}>
                <NotificationList/>
              </Menu>
              <IconButton {...bindTrigger(accountPopupState)} color='inherit'>
                <UserAvatar user={auth.user} />
              </IconButton>
              <Menu {...bindMenu(accountPopupState)}>
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
