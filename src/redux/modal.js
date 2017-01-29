const SET_TEXT = 'modal/SET_TEXT';
export const setText = text => ({ type: SET_TEXT, text });

const CLOSE_MODAL = 'modal/CLOSE_MODAL';
export const closeModal = () => ({ type: CLOSE_MODAL });

const initialState = {
  text: ''
};

export default function modal(state = initialState, action) {
  if (action.type === SET_TEXT) {
    return {
      ...state,
      text: action.text
    };
  }

  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      text: ''
    };
  }

  return state;
}
