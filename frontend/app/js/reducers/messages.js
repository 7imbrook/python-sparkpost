import { BOT, HUMAN, BOT_MESSAGE, HUMAN_MESSAGE } from '../actions/messages';

export default function (state = [], action) {
  switch (action.type) {
    case BOT_MESSAGE:
      return [
        ...state,
        {
          content: action.payload,
          timeStamp: new Date(),
          messageFormat: action.messageFormat,
          from: BOT,
          id: state.length + 1,
        },
      ];
    case HUMAN_MESSAGE:
      return [
        ...state,
        {
          messageFormat: action.messageFormat,
          content: action.payload,
          timeStamp: new Date(),
          from: HUMAN,
          id: state.length + 1,
        },
      ];
    default:
      return state;
  }
}
