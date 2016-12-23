import getStore from './getStore';
import { RNLocation as Location } from 'NativeModules';

const SET_DISTANCE = 'distance/SET_DISTANCE';
export const setDistance = distance => ({ type: SET_DISTANCE, distance });

export default function distance(state=5, action) {
  if (action.type === SET_DISTANCE) {
    return action.distance;
  }
  return state;
}

// Not sure if this i the right place for this
export const bindDistanceFilter = () => {
  const store = getStore();
  let lastDistance = store.getState().distance;
  Location.setDistanceFilter(lastDistance);

  store.subscribe(() => {
    if (store.distance !== lastDistance) {
      lastDistance = store.getState().distance;
      Location.setDistanceFilter(lastDistance);
    }
  });
};
