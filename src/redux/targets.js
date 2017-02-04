import { destinationPoint } from '../distanceUtils';

const CREATE_TARGET = 'target/CREATE_TARGET';
export const createTarget = currentPos => ({ type: CREATE_TARGET, currentPos });

export default function target(state = [], action) {
  if (action.type === CREATE_TARGET) {
    // TODO random in reducer is bad
    const angle = Math.random() * 360;
    const target = destinationPoint(action.currentPos, 50, angle);

    return [target];
  }

  return state;
}
