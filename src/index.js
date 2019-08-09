import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserData from './userData'
import Allusers from './allUsers'
import 'bootstrap/dist/css/bootstrap.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<UserData/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
