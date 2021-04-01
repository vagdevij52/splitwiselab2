import { combineReducers } from 'redux'

import userReducer from './registereduserSlice'

const rootReducer = combineReducers({
  users: userReducer,
})

export default rootReducer
