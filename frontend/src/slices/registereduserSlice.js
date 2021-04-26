import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  username: '',
  email: '',
  token:'',
  phone: '',
  defaultCurrency: '',
  userTimeZone: '',
  userlanguage: '',
  avatar:''
}

// Asynchronous thunk action
export function storeRegUserData(userId,username,token) {

  console.log("username: "+username);
  console.log("email: "+token);

  console.log("In storeRegUserData...going to reducer to store data in the store");
  return async dispatch => {
        var payload = {username,token}
        console.log(payload);
        console.log("dispatching user data to reducer: " + "username: "+username + "token: "+token);
        dispatch(storeUserData(payload));   
  }
}

export function getRegUserData(userId,token) {
  console.log("In getRegUserData: "+userId +" "+token);
    const requestOptions = {
      method: 'GET',
     headers: { 'Content-Type': 'application/json' ,'Authorization': token},
     body:{'id': userId}
    }
    console.log("Token in getUserData:::createAsyncThunk "+token);
      return async dispatch => {
      const resp = await fetch('http://54.227.195.128:4000/api/profile',requestOptions);
      console.log("Resp of current API: "+JSON.stringify(resp));
			const userData =  resp.json();
      var payload = userData;
			//return { userData };
      console.log("In getRegUserData::createAsyncThunk: "+userData);
      dispatch(getUserData(payload));
      }
		
};

// A slice for user with one reducer
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      console.log("In storeUserData reducer: "+action.payload.username +" "+action.payload.token);
      return {...state, username: action.payload.username, token: action.payload.token };
    },
    getUserData: (state,action) => {
      console.log("In getUserData reducer: "+action.payload.username);
      return state.username;
    }
  },
  // extraReducers: {
	// 	[getUserData.fulfilled]: (state, action) => {
  //     console.log("In getUserData extra reducer:::Action.payload.username: "+action.payload.username);
	// 		return action.payload.username;
	// 	},
  // },
})

// One action generated from the slice
 export const { storeUserData} = userSlice.actions
 // One action generated from the slice
 export const { getUserData} = userSlice.actions
 // A selector
 export const userUsernameSelector = state => state.username
  // A selector
  export const userTokenSelector = state => state.token
 // The reducer
 export default userSlice.reducer

 