import React, { useState, useCallback} from 'react';
import useWebSocket , { ReadyState } from 'react-use-websocket';

export default function useWebsocket({url}) {
    const [socketUrl, setSocketUrl] = useState(url);
    const [notifications,setNotifications] = useState([])
    const {
        readyState,
    } = useWebSocket(socketUrl,{
        onMessage: (msg) => {
            if(!(msg.data.includes("Hello user:"))){
                console.log(JSON.parse(msg.data));
                
                setNotifications([...notifications,msg.data]); 
                
            }
      
        },
    });
    const addNotification = (notification) => {
        setNotifications([...notifications,...notification])
    }

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
    }

}