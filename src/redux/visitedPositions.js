// TODO - rename from visitedPositions?
const SET_CURRENT_POSITION = 'visitedPositions/SET_CURRENT_POSITION';
export const setCurrentPosition = ({latitude, longitude}) => ({ type: SET_CURRENT_POSITION, latitude, longitude });

const CLEAR_POSITIONS = 'visitedPositions/CLEAR_POSITIONS';
export const clearPositions = () => ({ type: CLEAR_POSITIONS });

const initialState = {
  current: null,
  historical: []
};

export default function visitedPositions(state=initialState, action) {
  if (action.type === SET_CURRENT_POSITION) {
    const { latitude, longitude } = action;
    let historical = state.historical;
    if (state.current) {
      historical = historical.concat(state.current);
    }
    return {
      current: { latitude, longitude },
      historical
    };
  }

  // TODO - write some simple tests
  if (action.type === CLEAR_POSITIONS) {
    return {
      ...state,
      historical: []
    };
  }

  return state;
}
