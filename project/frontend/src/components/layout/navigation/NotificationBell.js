import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import useWebsocket from '../../../hooks/useWebsocket';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

export default function NotificationBell(props) {
  const auth = useAuth();

  const { notifications } = useWebsocket({
    url: `ws://localhost:8000/ws/${auth.user.id}`,
  });

  return (
    <Badge
      badgeContent={props.notifications.length + notifications.length}
      color='secondary'
    >
      <NotificationsIcon style={{ fontSize: 25 }}/>
    </Badge>
  );
}
