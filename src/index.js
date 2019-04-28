import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Login from './components/login/Login';
import Post from './components/post/Post';
import Feed from './components/feed/Feed';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Feed />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
