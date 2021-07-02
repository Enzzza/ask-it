import { ProvideAuth } from './contexts/AuthContext';
import Router from './router/router';
function App() {
  return (
    <>
      <ProvideAuth>
        <Router />
      </ProvideAuth>
    </>
  );
}

export default App;
