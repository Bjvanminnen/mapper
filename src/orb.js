import seedrandom from 'seedrandom';
import { floor, random } from './utils';

export const OrbType = {
  Red: 'Red',
  Green: 'Green',
  Blue: 'Blue'
};

const SECRET = 'secret';
const MIN_DURATION = 1000 * 60 * 5; // 5 minutes
const MAX_DURATION = 1000 * 60 * 20; // 20 minutes
const CELL_SIZE = 0.01;

export const orb = ({latitude, longitude, orbType, startTime, duration}) => ({
  latitude,
  longitude,
  orbType,
  startTime,
  duration
});

/**
 * Divide time into blocks of MAX_DURATION. All calls within a given time
 * block will return the same result
 */
export function getTimings(currentTime) {
  const blockStart = floor(currentTime.getTime(), MAX_DURATION);
  // TODO : timings for previous block as well

  const seed = SECRET + blockStart;
  const genNum = seedrandom(seed);

  const numTimings = 3; // could be randomized

  let timings = [];
  for (let i = 0; i < numTimings; i++) {
    timings.push({
      startTime: blockStart + random(0, MAX_DURATION, genNum),
      duration: random(MIN_DURATION, MAX_DURATION, genNum)
    });
  }
  return timings;
}
