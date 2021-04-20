import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {configureStore} from '@reduxjs/toolkit';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './slices';
import 'bootstrap/dist/css/bootstrap.min.css';

import allReducers from './reducers';


//const store = configureStore({reducer: rootReducer})
//const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

const store = createStore(allReducers,
       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
       
//render App component on the root element
render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();