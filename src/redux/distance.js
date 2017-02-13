import getStore from './getStore';
import { RNLocation as Location } from 'NativeModules';

/**
 * Redux duck module for how precise we want our location updates to be.
 */
const INITIAL_DISTANCE = 1;

const SET_DISTANCE = 'distance/SET_DISTANCE';
export const setDistance = distance => ({ type: SET_DISTANCE, distance });

export default function distance(state=INITIAL_DISTANCE, action) {
  if (action.type === SET_DISTANCE) {
    return action.distance;
  }
  return state;
}

export const bindDistanceFilter = () => {
  const store = getStore();
  let lastDistance = store.getState().distance;
  store.subscribe(() => {
    if (store.distance !== lastDistance) {
      lastDistance = store.getState().distance;
      Location.setDistanceFilter(lastDistance);
    }
  });
};
