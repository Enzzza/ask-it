import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { UserAvatar } from '../../avatar/UserAvatar';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../../contexts/AuthContext';
import { useSagaState } from 'react-context-saga';
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

export default function NotificationList(props) {
  const classes = useStyles();
  const auth = useAuth();
  const [state, dispatch] = useSagaState('websocket');

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const postClickHandler = (event,id) => {
    console.log(event);
    console.log('post clicked with id ', id)
  }

  if (!props.notifications.length && (!(state.get('notifications')).length)) {
    return (
      <List className={classes.root}>
        <ListItem alignItems='flex-start'>
          <ListItemText primary='No notifications yet!'></ListItemText>
        </ListItem>
      </List>
    );
  } else {
    return (
      <List className={classes.root}>
        {[...props.notifications, ...state.get('notifications')].map((item) => (
          <>
            <ListItem alignItems='flex-start' key={(item.newPost.id).toString()} onClick={(event) => postClickHandler(event, item.orginalPost.id)}>
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
            <Divider />
          </>
        ))}
      </List>
    );
  }
}
