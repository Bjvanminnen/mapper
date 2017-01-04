const SET_CURRENT_POSITION = 'positions/SET_CURRENT_POSITION';
export const setCurrentPosition = ({latitude, longitude}, course) => ({
  type: SET_CURRENT_POSITION,
  latitude,
  longitude,
  course
});

const CLEAR_POSITIONS = 'positions/CLEAR_POSITIONS';
export const clearPositions = () => ({ type: CLEAR_POSITIONS });

const initialState = {
  current: null,
  heading: 0,
  historical: []
};

export default function positions(state=initialState, action) {
  if (action.type === SET_CURRENT_POSITION) {
    const { latitude, longitude, course } = action;
    let historical = state.historical;
    if (state.current) {
      historical = historical.concat(state.current);
    }
    return {
      current: { latitude, longitude },
      heading: course,
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
