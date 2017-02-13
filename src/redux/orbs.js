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


const ADD_ORB_BLOCK = 'orbs/ADD_ORB_BLOCK';
export const addOrbBlock = orbBlock => ({
  type: ADD_ORB_BLOCK,
  orbBlock
});

const CLOSE_ORB = 'orbs/CLOSE_ORB';
export const closeOrb = orbId => ({ type: CLOSE_ORB, orbId });

const initialState = List();

export default function reducer(state = initialState, action) {
  if (action.type === ADD_ORB_BLOCK) {
    return state.push(
      ...action.orbBlock.orbs.map((orb, index) => (
        new Orb({
        ...orb,
        id: state.size + index,
        visited: false
      })))
    );
  }

  if (action.type === CLOSE_ORB) {
    const id = action.orbId;
    const newOrb = state.get(id).set('visited', true);
    return state.set(id, newOrb);
  }

  return state;
}
