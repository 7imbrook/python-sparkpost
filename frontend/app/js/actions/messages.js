import * as io from 'socket.io-client';
import store from '../store';
import { START_LISTENING, STOP_LISTENING } from './listen';

export const BOT = 'BOT';
export const HUMAN = 'HUMAN';
export const BOT_MESSAGE = 'BOT_MESSAGE';
export const HUMAN_MESSAGE = 'HUMAN_MESSAGE';

export const PLAINTEXT_MESSAGE = 'PLAINTEXT_MESSAGE';
export const IMAGE_MESSAGE = 'IMAGE_MESSAGE';

const path = '/socket/';
const socket = io('/socket/message', { path });

function robotMessage(message) {
  return (dispatch) => {
    if (message.messageFormat === PLAINTEXT_MESSAGE) {
      // Emit isSpeaking
      const msg = new SpeechSynthesisUtterance(message.content);
      window.speechSynthesis.speak(msg);
    }

    return dispatch({
      type: BOT_MESSAGE,
      messageFormat: message.messageFormat,
      payload: message.content,
    });
  };
}

export function humanMessage(message) {
  return (dispatch) => {
    console.log(message);
    socket.emit('message', message);
    return dispatch({
      type: HUMAN_MESSAGE,
      messageFormat: PLAINTEXT_MESSAGE,
      payload: message,
    });
  };
}


socket.on('connect', () => {
    console.log('Yay!');
});

socket.on('message', (msg) => {
  store.dispatch(robotMessage({
    messageFormat: PLAINTEXT_MESSAGE,
    content: msg,
  }));
});

socket.on('image', (img) => {
  store.dispatch(robotMessage({
    messageFormat: IMAGE_MESSAGE,
    content: img,
  }));
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
