import { IS_SPEAKING } from '../actions/messages';

export default function (state = false, action) {
  switch (action.type) {
    case IS_SPEAKING:
        return action.speaking;
    default:
      return state;
  }
}
