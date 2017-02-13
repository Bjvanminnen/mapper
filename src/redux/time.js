import getStore from './getStore';

/**
 * Redux duck module that tracks the current time.
 */
const INITIAL_TIME = 0;
const UPDATE_INTERVAL = 10 * 1000; // 30 seconds

const SET_TIME = 'distance/SET_TIME';
export const setTime = time => ({ type: SET_TIME, time });

export default function distance(state=INITIAL_TIME, action) {
  if (action.type === SET_TIME) {
    return action.time;
  }
  return state;
}

function setCurrentTime(store) {
  const date = new Date();
  store.dispatch(setTime(date.getTime()));
}

// Not sure if this is the right place for this
export const bindCurrentTime = () => {
  const store = getStore();
  setCurrentTime(store);
  setInterval(() => {
    setCurrentTime(store);
  }, UPDATE_INTERVAL);
};
