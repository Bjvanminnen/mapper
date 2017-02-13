import getStore from './getStore';

/**
 * Redux duck module that tracks the current time.
 */
const INITIAL_TIME = 0;

const SET_TIME = 'distance/SET_TIME';
export const setTime = time => ({ type: SET_TIME, time });

export default function distance(state=INITIAL_TIME, action) {
  if (action.type === SET_TIME) {
    return action.time;
  }
  return state;
}

/**
 * @returns {number} Current time in milliseconds
 */
export function getCurrentTime() {
  const date = new Date();
  return date.getTime();
}
