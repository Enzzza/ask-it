// Use immutable to improve performance and avoid a mess
import Immutable from 'immutable';

async function connect(state, payload, dispatch) {
  const connected = state.get('connected');
  console.log(connected);
  const websocket = new WebSocket(`ws://localhost:8000/ws/${payload.id}`);

  websocket.onopen = function (evt) {
    // Call merge action to update state with connected: true
    dispatch({
      type: 'merge',
      payload: { connected: true },
    });
  };
  websocket.onclose = function (evt) {
    // Call merge action to update state with connected: false
    dispatch({
      type: 'merge',
      payload: { connected: false },
    });
  };
  websocket.onmessage = function (evt) {
    if (!evt.data.includes('Hello user:')) {
      console.log(evt.data);
      // Call a async saga function with new notification
      dispatch({
        type: 'addNotification',
        payload: {
          notification: JSON.parse(evt.data),
        },
      });
    }
  };
  websocket.onerror = function (evt) {};
  // Save current websocket in state
  dispatch({
    type: 'set',
    key: 'websocket',
    payload: websocket,
  });
}

// Close socket when user logout
async function disconnect(state,payload,dispatch){
    const websocket = state.get('websocket');
    websocket.close();
    dispatch({
        type:'merge',
        payload: {
            notifications: []
        },
    })
}

// Declare remote async method that will be called from Server
async function addNotification(state, payload, dispatch) {
  dispatch({
    type: 'merge',
    payload: {
      notifications: [...state.get('notifications'), payload.notification],
    },
  });
}

// Delete notification by post id
async function deleteNotificationById(state, payload, dispatch) {
  let newNotifications = state
    .get('notifications')
    .filter((notification) => notification.orginalPost.id !== payload.id);
  console.log(newNotifications);
  dispatch({
    type: 'merge',
    payload: { notifications: newNotifications },
  });
}

// Add notifications that user recived while offline
async function addOfflineNotifications(state, payload, dispatch) {
    console.log(payload);
    // dispatch({
    //   type: 'merge',
    //   payload: {
    //     notifications: [...state.get('notifications'), ...(payload.notifications)],
    //   },
    // });
  }

const WEBSOCKET_SAGA = {
  connect,
  disconnect,
  addNotification,
  deleteNotificationById,
  addOfflineNotifications,
};

const initialValues = Immutable.fromJS({
  websocket: null,
  notifications: [],
  connected: false,
});

export default WEBSOCKET_SAGA;

export { initialValues };
