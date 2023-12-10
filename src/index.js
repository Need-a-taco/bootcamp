import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { Provider } from "react-redux";
import {createStore, combineReducers, } from 'redux';
import { ReactReduxFirebaseProvider, firebaseReducer} from 'react-redux-firebase';
import {composeWithDevTools} from "redux-devtools-extension";

const firebaseConfig = {
  apiKey: "AIzaSyBlAGG-jwtJC7ovucFS7zqIFVnYj8ng_xo",
  authDomain: "bootcamp-d874b.firebaseapp.com",
  projectId: "bootcamp-d874b",
  storageBucket: "bootcamp-d874b.appspot.com",
  messagingSenderId: "302257184767",
  appId: "1:302257184767:web:1c9e2b3f90b1d4535191ca",
  measurementId: "G-V9PL2PHNMD"
};


firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

const rrfConfig = {
    userProfile: 'users',
}
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
  }

 ReactDOM.render(
    <Provider store= { store }>
        <ReactReduxFirebaseProvider {... rrfProps} >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
         </ReactReduxFirebaseProvider>,
    </Provider>,
    document.getElementById('root')
 );