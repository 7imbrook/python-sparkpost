import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import recognitionMiddleware from './middleware';

const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk, recognitionMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;
