import * as io from 'socket.io-client';

export const BOT = 'BOT';
export const HUMAN = 'HUMAN';
export const BOT_MESSAGE = 'BOT_MESSAGE';
export const HUMAN_MESSAGE = 'HUMAN_MESSAGE';

export function humanMessage(message) {
  return (dispatch) => {
    console.log(message);
    return dispatch({
      type: HUMAN_MESSAGE,
      payload: message,
    });
  };
}

const socket = io('http://localhost:3000/api/message');

socket.on('connect', () => {
    console.log('Yay!');

});

socket.on('message', (msg) => {
  console.log('data');
  console.log(msg);
});