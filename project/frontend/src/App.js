import { ProvideAuth } from './contexts/AuthContext';
import Router from './router/router';
import WEBSOCKET_SAGA, { initialValues } from './sagas/websocketSaga';
import { createSagaProvider, createSagaReducer } from 'react-context-saga';
const websocketReducer = createSagaReducer(WEBSOCKET_SAGA);
const WebsocketProvider = createSagaProvider({
  sagaName: 'websocket',
  reducer: websocketReducer,
  initialValues: initialValues,
});


function App() {
  return (
    <>
      <ProvideAuth>
        <WebsocketProvider>
          <Router />
        </WebsocketProvider>
      </ProvideAuth>
    </>
  );
}

export default App;
