import * as io from 'socket.io-client';
import store from '../store';
import { START_LISTENING, STOP_LISTENING } from './listen';

export const BOT = 'BOT';
export const HUMAN = 'HUMAN';
export const BOT_MESSAGE = 'BOT_MESSAGE';
export const HUMAN_MESSAGE = 'HUMAN_MESSAGE';

const socket = io('http://localhost:3000/api/message');

socket.on('connect', () => {
    console.log('Yay!');
});

socket.on('message', (msg) => {
  store.dispatch(robotMessage(msg));
});

socket.on('control', (msg) => {
  if (msg.listen) {
    store.dispatch({
      type: START_LISTENING,
    });
  } else {
    store.dispatch({
      type: STOP_LISTENING,
    });
  }
});

function robotMessage(message) {
  return (dispatch) => {
    const msg = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(msg);
    return dispatch({
      type: BOT_MESSAGE,
      payload: message
    });
  };
}

export function humanMessage(message) {
  return (dispatch) => {
    console.log(message);
    socket.emit('message', message);
    return dispatch({
      type: HUMAN_MESSAGE,
      payload: message,
    });
  };
}
