import React, { Component } from 'react';
import '../assets/App.css';
import Login from '../components/Login';
import Post from '../components/Post';
import Feed from '../components/Feed';

class App extends Component {
  render() {
    return (
      <>
        <Login />
        {/* <Feed /> */}
      </>
    );
  }
}

export default App;
