import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import AdminRoom from './pages/AdminRoom';
import Room from './pages/Room';
import './styles/global.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
