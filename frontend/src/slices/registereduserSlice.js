import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  username: '',
  email: '',
  phone: '',
  defaultCurrency: '',
  userTimeZone: '',
  userlanguage: '',
  avatar:''
}

// A slice for user with one reducer
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData: (state, { payload }) => {
      state.username = payload.username
      state.email = payload.email
    },
  },
})

// One action generated from the slice
 export const { storeUserData} = userSlice.actions
 // A selector
 export const userSelector = state => state.user
 // The reducer
 export default userSlice.reducer

 // Asynchronous thunk action
export function storeRegUserData(username, email) {

  console.log("username: "+username);
  console.log("email: "+email);

  console.log("In storeRegUserData...going to reducer to store data in the store");
  return async dispatch => {
        var payload = {username,email}
        console.log(payload);
        console.log("dispatching user data to reducer" +username + " email: "+email);
        dispatch(storeUserData(payload));   
  }
}
