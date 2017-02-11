import { combineReducers } from 'redux';
import listen from './listen';
import messages from './messages';

const rootReducer = combineReducers({
  listen,
  messages,
});

export default rootReducer;
