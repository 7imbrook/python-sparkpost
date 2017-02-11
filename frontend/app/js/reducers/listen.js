import { START_LISTENING, STOP_LISTENING } from '../actions/listen';

export default function (state = false, action) {
  switch (action.type) {
    case START_LISTENING:
      return true;
    case STOP_LISTENING:
      return false;
    default:
      return state;
  }
}
