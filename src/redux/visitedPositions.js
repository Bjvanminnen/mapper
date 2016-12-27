const ADD_POSITION = 'visitedPositions/ADD_POSITION';
export const addPosition = ({latitude, longitude}) => ({ type: ADD_POSITION, latitude, longitude });

const CLEAR_POSITIONS = 'visitedPositions/CLEAR_POSITIONS';
export const clearPositions = () => ({ type: CLEAR_POSITIONS });

export default function visitedPositions(state=[], action) {
  if (action.type === ADD_POSITION) {
    return state.concat({
      latitude: action.latitude,
      longitude: action.longitude
    });
  }

  // TODO - write some simple tests
  if (action.type === CLEAR_POSITIONS) {
    return [getCurrentPosition(state)];
  }

  return state;
}

// Helpers
export function getCurrentPosition(state) {
  return state[state.length - 1];
}
