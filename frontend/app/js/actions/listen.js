export const START_LISTENING = 'START_LISTENING';
export const STOP_LISTENING = 'STOP_LISTENING';

export function startListening() {
  return (dispatch, getStore) => {
    if (getStore().speaking) {
      setTimeout(() => {
        dispatch(startListening());
      }, 200);
    } else {
      dispatch({
        type: START_LISTENING,
      });
    }
  };
}

export function stopListening() {
  return {
    type: STOP_LISTENING,
  };
}
