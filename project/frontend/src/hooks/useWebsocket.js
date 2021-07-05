import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function useWebsocket({ url }) {
  const [socketUrl, setSocketUrl] = useState(url);
  const [notifications, setNotifications] = useState([]);
  const { readyState } = useWebSocket(socketUrl, {
    onMessage: (msg) => {
      if (!msg.data.includes('Hello user:')) {
        setNotifications([...notifications, JSON.parse(msg.data)]);
        console.log(notifications);
      }
    },
  });
  const addNotification = (notification) => {
    setNotifications([...notifications, ...notification]);
    console.log(notifications);
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {
    notifications,
    addNotification,
    connectionStatus,
    setSocketUrl,
  };
}
