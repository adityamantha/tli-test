import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Post from './components/post/Post';
import Feed from './components/feed/Feed';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <Feed />
      </div>
    );
  }
}

export default App;
