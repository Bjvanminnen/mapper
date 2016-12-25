import haversine from 'haversine';
import LatLong from './LatLong';

import getStore from './redux/getStore';
import { addPosition } from './redux/visitedPositions';

export const distanceDiff = (one, two) => {
  return haversine(one, two, { unit: 'meter' });
}

export const isWithin = (one, two, meters) => {
  return distanceDiff(one, two) <= meters;
}

// TODO - generate a location n meters away
export const foo = (n, angle = 0) => {
  const lat = 37.785834;
  const long = -122.406417;

  const latLong = new LatLong(lat, long);
  const next = latLong.destinationPoint(n, angle);

  const store = getStore();
  store.dispatch(addPosition({
    latitude: next.lat,
    longitude: next.lon
  }))
};
window.foo = foo;
