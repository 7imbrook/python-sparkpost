/* eslint-disable */
import store from './store';
import { humanMessage } from './actions/messages';

const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;

recognition.onstart = () => console.log('Starting Recognition');
recognition.onend = () => console.log('Ending Recognition');

recognition.onresult = (event) => {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      store.dispatch(humanMessage(event.results[i][0].transcript));
    }
  }
};

recognition.start();

export default recognition;
