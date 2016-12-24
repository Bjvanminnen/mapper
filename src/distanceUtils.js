import haversine from 'haversine';

export const distanceDiff = (one, two) => {
  return haversine(one, two, { unit: 'meter' });
}

export const isWithin = (one, two, meters) => {
  return distanceDiff(one, two) <= meters;
}

// TODO - generate a location n meters away
