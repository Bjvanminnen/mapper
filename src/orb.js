import seedrandom from 'seedrandom';
import { floor } from './utils';

export const OrbType = {
  Red: 'Red',
  Green: 'Green',
  Blue: 'Blue'
};

const SECRET = 'secret';
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
  const genNum = seendrandom(seed);




}
