import { createStore } from 'redux';
import globalReducer from './reducers';

const store = createStore(globalReducer);

export default store;
