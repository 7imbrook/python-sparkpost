import { combineReducers } from 'redux';
import listen from './listen';
import messages from './messages';
import speaking from './speaking';

const rootReducer = combineReducers({
  listen,
  messages,
  speaking,
});

export default rootReducer;
