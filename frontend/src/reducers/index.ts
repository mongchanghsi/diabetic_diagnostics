import { combineReducers } from 'redux';
import langReducer from './langReducer';
import userDetailReducer from './userDetailReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  language: langReducer,
  user: userDetailReducer,
  image: imageReducer,
});
