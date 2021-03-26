import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import rootReducer from './slices';
import 'bootstrap/dist/css/bootstrap.min.css';



const store = configureStore({reducer: rootReducer})

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