import React, { Component } from 'react';
import '../assets/App.css';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './Login';
import Feed from './Feed';
import { getToken } from '../services/tokenService';

class App extends Component {

  fetchUser = async () => {
    console.group('App::fetchUser');
    const token = getToken();
    console.log('localStorage::token:', token);
    console.groupEnd();
    if (token) {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const { data } = await response.json();
        const [user] = data;
        this.setState({ user });
      } catch (e) {
        console.error('error:', e);
      }
    }
  }

  componentDidMount() {
    console.group('App::componentDidMount');
    this.fetchUser();
    console.groupEnd();
  }

  render() {
    return (
      <>
        {/* <Router>
          <Switch>
            <Route
              exact path='/'
              render={(renderProps) => (
                (this.state.user)
                  ? (<Redirect to='/feed' />)
                  : (<Redirect to='/login' />)
              )}
            />
            <Route
            exact path='/login'
            render={(renderProps) => (
              (this.state.user)
                ? (<Redirect to='/feed' />)
                : (<Login fetchUser={this.fetchUser} />)
            )}
          />
            <Route
              exact path='/feed'
              render={(renderProps) => (
                (!this.state.user)
                  ? (<Redirect to='/login' />)
                  : (<Feed />)
              )}
            />
          </Switch>
        </Router> */}
        <Login fetchUser={this.fetchUser} />
      </>
    );
  }
}

export default App;
