import { combineReducers } from 'redux'
import articleReducer from './articleReducer'
import userReducer from './userReducer'
const rootReducer = combineReducers({
  articles: articleReducer,
  user: userReducer,
})

export default rootReducer