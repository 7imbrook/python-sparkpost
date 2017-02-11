import { BOT, HUMAN, BOT_MESSAGE, HUMAN_MESSAGE } from '../actions/messages';

export default function (state = [], action) {
  switch (action.type) {
    case BOT_MESSAGE:
      return [
        ...state,
        {
          ...action.payload,
          from: BOT,
        },
      ];
    case HUMAN_MESSAGE:
      return [
        ...state,
        {
          ...action.payload,
          from: HUMAN,
        },
      ];
    default:
      return state;
  }
}
