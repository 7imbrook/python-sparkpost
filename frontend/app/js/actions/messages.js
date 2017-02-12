import * as io from 'socket.io-client';
import store from '../store';
import { startListening, stopListening } from './listen';

export const BOT = 'BOT';
export const HUMAN = 'HUMAN';
export const BOT_MESSAGE = 'BOT_MESSAGE';
export const HUMAN_MESSAGE = 'HUMAN_MESSAGE';
export const IS_SPEAKING = 'IS_SPEAKING';

const path = '/socket/';
const socket = io('/socket/message', { path });

socket.on('connect', () => {
    console.log('Yay!');
});

socket.on('message', (msg) => {
  store.dispatch(robotMessage(msg));
});

socket.on('control', (msg) => {
  if (msg.listen) {
    store.dispatch(startListening());
  } else {
    store.dispatch(stopListening());
  }
});

function robotMessage(message) {
  return (dispatch) => {
    // Emit isSpeaking
    const msg = new SpeechSynthesisUtterance(message);
    dispatch({ type: IS_SPEAKING, speaking: true });
    window.speechSynthesis.speak(msg);
    msg.onend = () => dispatch({ type: IS_SPEAKING, speaking: false });
    return dispatch({
      type: BOT_MESSAGE,
      payload: message
    });
  };
}

export function humanMessage(message) {
  return (dispatch) => {
    socket.emit('message', message);
    return dispatch({
      type: HUMAN_MESSAGE,
      payload: message,
    });
  };
}
