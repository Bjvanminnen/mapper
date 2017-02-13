import { List, Map, Record, Set } from 'immutable';
import { OrbType, timeBlockStart } from '../orb';

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

const OrbsState = Record({
  keys: Set(),
  // A map where each key is a time, and each value is a set of blocks
  orbsByTime: Map()
});
const initialState = new OrbsState();

// TODO - write/fix tests
export default function reducer(state = initialState, action) {
  if (action.type === ADD_ORB_BLOCK) {
    const orbBlock = action.orbBlock;
    const { key, time } = orbBlock;

    if (state.keys.has(key)) {
      throw new Error(`already added orbBlock ${key}`);
    }

    const currentOrbs = state.orbsByTime.get(time) || List();
    const mergedOrbs = currentOrbs.push(
      ...action.orbBlock.orbs.map((orb, index) => (
        new Orb({
          ...orb,
          id: `${key}_${index}`,
          visited: false
        })
      ))
    );

    return new OrbsState({
      keys: state.keys.add(key),
      orbsByTime: state.orbsByTime.set(time, mergedOrbs)
    });
  }

  // TODO - fix
  if (action.type === CLOSE_ORB) {
    const id = action.orbId;
    const newOrb = state.get(id).set('visited', true);
    return state.set(id, newOrb);
  }

  return state;
}

// Selectors
export const selectOrbs = (state, time) => {
  const start = timeBlockStart(time);
  const orbs = state.orbsByTime.get(start);
  if (!orbs) {
    return [];
  }
  return orbs.toJS();
};
