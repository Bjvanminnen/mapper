const ADD_POSITION = 'positions/ADD_POSITION';
export const addPosition = ({lat, long}) => ({ type: ADD_POSITION, lat, long });

const CLEAR_POSITIONS = 'positions/CLEAR_POSITIONS';
export const clearPositions = () => ({ type: CLEAR_POSITIONS });

export default function positions(state=[], action) {
  if (action.type === ADD_POSITION) {
    console.log(action.lat, action.long);
    return state.concat({
      lat: action.lat,
      long: action.long
    });
  }

  // TODO - write some simple tests
  if (action.type === CLEAR_POSITIONS) {
    return [state[state.length - 1]];
  }

  return state;
}
