const ADD_ITEM = 'inventory/ADD_ITEM';
export const addItem = color => ({ type: ADD_ITEM, color });

const initialState = {
  red: 0,
  green: 0,
  blue: 0
};

export default function inventory(state = initialState, action) {
  if (action.type === ADD_ITEM) {
    const { color } = action;
    if (state[color] === undefined) {
      throw new Error('Unknown item: ' + color);
    }

    return {
      ...state,
      [color]: state[color] + 1
    };
  }
  return state;
}
