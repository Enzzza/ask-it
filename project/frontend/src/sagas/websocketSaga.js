// Use immutable to improve performance and avoid a mess
import Immutable from 'immutable';

async function connect(state, payload, dispatch) {
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
    // Call a async saga function with new notification
    dispatch({
      type: 'addNotifications',
      payload: {
        notifications: JSON.parse(evt.data),
      },
    });
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
async function disconnect(state, payload, dispatch) {
  const websocket = state.get('websocket');
  websocket.close();
  dispatch({
    type: 'merge',
    payload: {
      notifications: [],
    },
  });
}

// Add offline notifications
async function addNotifications(state, payload, dispatch) {
  // Check if payload is array
  let storedNotifications = state.get('notifications');
  let recivedNotifications;

  if (Array.isArray(payload.notifications)) {
    recivedNotifications = [...storedNotifications, ...payload.notifications];
  } else {
    recivedNotifications = [...storedNotifications, payload.notifications];
  }

  dispatch({
    type: 'merge',
    payload: {
      notifications: recivedNotifications,
    },
  });
}

// Delete notification by post id
async function deleteNotificationById(state, payload, dispatch) {
  let newNotifications = state
    .get('notifications')
    .filter((notification) => notification.newPost.id !== payload.id);

  dispatch({
    type: 'merge',
    payload: { notifications: newNotifications },
  });
}

const WEBSOCKET_SAGA = {
  connect,
  disconnect,
  addNotifications,
  deleteNotificationById,
};

const initialValues = Immutable.fromJS({
  websocket: null,
  notifications: [],
  connected: false,
});

export default WEBSOCKET_SAGA;

export { initialValues };
