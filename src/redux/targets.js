const CREATE_TARGET = 'target/CREATE_TARGET';
export const createTarget = ({latitude, longitude}) => ({ type: CREATE_TARGET, latitude, longitude });

export default function target(state = [], action) {
  if (action.type === CREATE_TARGET) {
    const { latitude, longitude } = action;
    return state.concat({ latitude, longitude });
  }

  return state;
}
