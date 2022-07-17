import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { initializeApp } from 'firebase/app';
// import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

//import './App.css';
import './assets/scss/style.scss';

//declare firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDSNdC4PlyGukXL4ko7CpYJdAKsd2thfTo",
  authDomain: "kadcarsnft-28bea.firebaseapp.com",
  projectId: "kadcarsnft-28bea",
  storageBucket: "kadcarsnft-28bea.appspot.com",
  messagingSenderId: "830803935946",
  appId: "1:830803935946:web:82a45ac6d2aae04c6f6a33"
};

//Initialize firebase app
initializeApp(firebaseConfig);

const history = createBrowserHistory();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>,
  // document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
