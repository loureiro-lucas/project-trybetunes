import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>

          <Route exact path="/album/:id" component={ Album } />

          <Route
            exact
            path="/profile/edit"
            render={ (props) => <ProfileEdit { ...props } /> }
          />

          <Route exact path="/profile" component={ Profile } />

          <Route exact path="/search" component={ Search } />

          <Route exact path="/favorites" component={ Favorites } />

          <Route exact path="/" render={ (props) => <Login { ...props } /> } />

          <Route path="*" component={ NotFound } />

        </Switch>
      </HashRouter>
    );
  }
}

export default App;
