import { START_LISTENING, STOP_LISTENING } from './actions/listen';
import { BOT_MESSAGE, IS_SPEAKING } from './actions/messages';
import recognition from './recognition';

const recognitionMiddleware = store => next => action => {
  switch (action.type) { 
    case START_LISTENING:
      recognition.start();
      break;
    case STOP_LISTENING:
      recognition.stop();
      break;
    case BOT_MESSAGE:
      const msg = new SpeechSynthesisUtterance(action.payload);
      store.dispatch({ type: IS_SPEAKING, speaking: true });
      window.speechSynthesis.speak(msg);
      msg.onend = () => store.dispatch({ type: IS_SPEAKING, speaking: false });
      break;
  }
  return next(action);
};

export default recognitionMiddleware;
