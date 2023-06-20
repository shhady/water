/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyProvider from './services/MyProvider'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


ReactDOM.render(
  <React.StrictMode>
    <MyProvider>
    <App />
    </MyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();