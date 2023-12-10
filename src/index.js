import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { Provider } from "react-redux";
import 'firebase/database';
import {createStore, combineReducers, } from 'redux';
import { ReactReduxFirebaseProvider, firebaseReducer} from 'react-redux-firebase';
import {composeWithDevTools} from "redux-devtools-extension";

const firebaseConfig = {
    apiKey: "AIzaSyBhMN9a9AY1NN6FTNAJTn-_3RF30lPxPU0",
    authDomain: "bootcamp-9ccf6.firebaseapp.com",
    databaseURL: "https://bootcamp-9ccf6-default-rtdb.firebaseio.com",
    projectId: "bootcamp-9ccf6",
    storageBucket: "bootcamp-9ccf6.appspot.com",
    messagingSenderId: "680012162000",
    appId: "1:680012162000:web:3162f681824f45d019cfd5",
    measurementId: "G-62Y0R4GX6F"
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
