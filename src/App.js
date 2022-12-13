import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li><Link to="/"> Login </Link></li>
          <li><Link to="/about"> About </Link></li>
          <li><Link to="/users"> Users </Link></li>
        </ul>
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
