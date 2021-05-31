import { combineReducers } from 'redux';
import langReducer from './langReducer';
import userDetailReducer from './userDetailReducer';

export default combineReducers({
  language: langReducer,
  user: userDetailReducer,
});
