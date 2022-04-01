import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux/reducer/rootReducer'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD9cM3ecRMvYRVbXthuaOgqC3Vx4OVKZdY",
  authDomain: "resumemaker-9c7e1.firebaseapp.com",
  projectId: "resumemaker-9c7e1",
  storageBucket: "resumemaker-9c7e1.appspot.com",
  messagingSenderId: "85539969982",
  appId: "1:85539969982:web:d606e39faa697360e9f7ef",
  measurementId: "G-CRBV1EJXEB"
};

firebase.initializeApp(firebaseConfig)
firebase.firestore()


const reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebase)))


ReactDOM.render(

  <BrowserRouter>
    <Provider store={reduxStore}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);