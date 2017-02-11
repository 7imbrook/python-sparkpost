import { START_LISTENING, STOP_LISTENING } from './actions/listen';
import recognition from './recognition';

const recognitionMiddleware = () => next => (action) => {
  if (action.type === START_LISTENING) {
    recognition.start();
  } else if (action.type === STOP_LISTENING) {
    recognition.stop();
  }
  return next(action);
};

export default recognitionMiddleware;
