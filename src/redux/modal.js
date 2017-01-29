const SET_MODAL = 'modal/SET_MODAL';
export const setModal = (screenId, data) => ({ type: SET_MODAL, screenId, data });

const CLOSE_MODAL = 'modal/CLOSE_MODAL';
export const closeModal = () => ({ type: CLOSE_MODAL });

const initialState = {
  screenId: '',
  data: null
};

export default function modal(state = initialState, action) {
  if (action.type === SET_MODAL) {
    return {
      ...state,
      screenId: action.screenId,
      data: action.data
    };
  }

  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      screenId: '',
      data: null
    };
  }

  return state;
}
