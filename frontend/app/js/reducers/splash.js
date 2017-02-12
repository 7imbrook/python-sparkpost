import { HIDE_SPLASH } from '../actions/splash';

export default function (state = true, action) {
  switch (action.type) {
    case HIDE_SPLASH:
      return false;
    default:
      return state;
  }
}
