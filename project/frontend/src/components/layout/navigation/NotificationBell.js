import React, { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { useSagaState } from 'react-context-saga';

export default function NotificationBell() {
  const auth = useAuth();
  const [state, dispatch] = useSagaState('websocket');

  useEffect(() => {
    console.log('connect!');
    dispatch({ type: 'connect', payload: { id: auth.user.id } });
    return () => {
      console.log('disconect');
      dispatch({ type: 'disconnect' });
    };
  }, []);

  return (
    <Badge badgeContent={state.get('notifications').length} color='secondary'>
      <NotificationsIcon style={{ fontSize: 25 }} />
    </Badge>
  );
}
