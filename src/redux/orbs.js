import { List, Record } from 'immutable';
import { OrbType } from '../orb';

const Orb = Record({
  lat: 0,
  long: 0,
  type: OrbType.Red,
  id: -1,
  visited: false
});


const ADD_ORB = 'orbs/ADD_ORB';
export const addOrb = (lat, long, orbType) => ({
  type: ADD_ORB,
  lat,
  long,
  orbType
});

const CLOSE_ORB = 'orbs/CLOSE_ORB';
export const closeOrb = orbId => ({ type: CLOSE_ORB, orbId });

const initialState = List();

export default function reducer(state = initialState, action) {
  if (action.type === ADD_ORB) {
    const { lat, long, orbType } = action;
    return state.push(new Orb({
      lat,
      long,
      type: orbType,
      id: state.size,
      visited: false
    }));
  }

  if (action.type === CLOSE_ORB) {
    const id = action.orbId;
    const newOrb = state.get(id).set('visited', true);
    return state.set(id, newOrb);
  }

  return state;
}
