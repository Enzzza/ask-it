import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NotificationBell from './NotificationBell';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { UserAvatar } from '../../avatar/UserAvatar';
import { Link as RouterLink } from 'react-router-dom';
import { useSagaState } from 'react-context-saga';

import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    maxHeight: 400,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Notification() {
  const notificationPopupState = usePopupState({
    variant: 'popover',
    popupId: 'userNotifications',
  });
  const classes = useStyles();

  const [state,dispatch] = useSagaState('websocket');

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <>
      <IconButton {...bindTrigger(notificationPopupState)} color='inherit'>
        <NotificationBell />
      </IconButton>
      <Menu {...bindMenu(notificationPopupState)}>
        {!state.get('notifications').length ? (
          <List className={classes.root}>
            <ListItem alignItems='flex-start'>
              <ListItemText primary='No notifications yet!'></ListItemText>
            </ListItem>
          </List>
        ) : (
          <List className={classes.root}>
            {[...state.get('notifications')].map((item) => (
              <>
                <ListItem
                  alignItems='flex-start'
                  key={item.newPost.id.toString()}
                  button
                  component={RouterLink}
                  to={`/posts/${item.orginalPost.id}`}
                  onClick={() => {
                    notificationPopupState.close();
                    dispatch({ type: 'deleteNotificationById', payload: { id: item.newPost.id } });
                    console.log(item.newPost.id);
                  }}
                >
                  <ListItemAvatar>
                    <UserAvatar user={item.sender} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={truncate(item.orginalPost.title, 30)}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component='span'
                          variant='body2'
                          className={classes.inline}
                          color='textPrimary'
                        >
                          {item.sender.name} {item.sender.surname}
                        </Typography>
                        {` — ${truncate(item.newPost.body, 50)}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
              </>
            ))}
          </List>
        )}
      </Menu>
    </>
  );
}
