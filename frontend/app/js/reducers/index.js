import { combineReducers } from 'redux';
import splash from './splash';
import listen from './listen';
import messages from './messages';
import speaking from './speaking';

const rootReducer = combineReducers({
  splash,
  listen,
  messages,
  speaking,
});

export default rootReducer;
