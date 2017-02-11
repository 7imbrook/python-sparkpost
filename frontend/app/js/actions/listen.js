export const START_LISTENING = 'START_LISTENING';
export const STOP_LISTENING = 'STOP_LISTENING';

export function startListening() {
  return {
    type: START_LISTENING,
  };
}

export function stopListening() {
  return {
    type: STOP_LISTENING,
  };
}
