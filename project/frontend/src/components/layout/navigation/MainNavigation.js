import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Notification from './Notification';
import { UserAvatar } from '../../avatar/UserAvatar';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import useCustomSnackbar from '../../utils/snackbar/useCustomSnackbar';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root:{
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));


function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}



export default function PrimarySearchAppBar() {
  const auth = useAuth();
  let history = useHistory();
  const classes = useStyles();
  const accountPopupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });
 
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

  const myQuestions = () => {
    accountPopupState.close();
    history.push(`/users/questions/${auth.user.id}`);
  }

  return (
    <div className={classes.grow}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' noWrap>
            <Button onClick={() => history.push('/')}>Home</Button>
            <Button onClick={() => history.push('/ask')}>Ask</Button>
          </Typography>

          <div className={classes.grow} />

          {auth.user ? (
            <div>
              <Notification/>
              <IconButton {...bindTrigger(accountPopupState)} color='inherit'>
                <UserAvatar user={auth.user} />
              </IconButton>
              <Menu {...bindMenu(accountPopupState)}>
                <MenuItem onClick={myAccount}>My account</MenuItem>
                <MenuItem onClick={myQuestions}>My questions</MenuItem>
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
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color='primary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}
