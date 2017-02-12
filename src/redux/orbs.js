import { List, Record } from 'immutable';
import { OrbType } from '../orb';

const Orb = Record({
  latitude: 0,
  longitude: 0,
  orbType: OrbType.Red,
  startTime: 0,
  duration: 0,
  id: -1,
  visited: false
});


const ADD_ORB = 'orbs/ADD_ORB';
export const addOrb = orb => ({
  type: ADD_ORB,
  orb
});

const CLOSE_ORB = 'orbs/CLOSE_ORB';
export const closeOrb = orbId => ({ type: CLOSE_ORB, orbId });

const initialState = List();

export default function reducer(state = initialState, action) {
  if (action.type === ADD_ORB) {
    return state.push(new Orb({
      ...action.orb,
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
