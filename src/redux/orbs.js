import { List, Record } from 'immutable';

export const OrbType = {
  Red: 'Red',
  Green: 'Green',
  Blue: 'Blue'
};

const Orb = Record({
  lat: 0,
  long: 0,
  type: OrbType.Red,
  id: -1
});


const ADD_ORB = 'orbs/ADD_ORB';
export const addOrb = (lat, long, orbType) => ({
  type: ADD_ORB,
  lat,
  long,
  orbType
});

const initialState = List();

export default function reducer(state = initialState, action) {
  if (action.type === ADD_ORB) {
    const { lat, long, orbType } = action;
    return state.push(new Orb({
      lat,
      long,
      type: orbType,
      id: state.size
    }));
  }

  return state;
}
