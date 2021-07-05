import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../../contexts/AuthContext';
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

export default function NotificationList() {
  const classes = useStyles();
  const auth = useAuth();
  
    return (
    <List className={classes.root}>
      {[0, 1, 2, 3, 4].map((id) => (
        <>
          <ListItem alignItems='flex-start' key={`${id}`}>
            <ListItemAvatar>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
            </ListItemAvatar>
            <ListItemText
              primary='Brunch this weekend?'
              secondary={
                <React.Fragment>
                  <Typography
                    component='span'
                    variant='body2'
                    className={classes.inline}
                    color='textPrimary'
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
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
