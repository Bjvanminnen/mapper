import seedrandom from 'seedrandom';
import { floor, random, randomInt } from './utils';

export const OrbType = {
  Red: 'Red',
  Green: 'Green',
  Blue: 'Blue'
};
const orbTypes = Object.keys(OrbType);

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
 * Divide time into blocks of MAX_DURATION.
 * Divide world into cells that are CELL_SIZE degrees wide and high.
 * Create n randomized orbs in a way such that the if the provided inputs are in
 * the same time block/location cell, they result in the same outputs.
 */
export function getRandomOrbs(currentLatitude, currentLongitude, currentTime, n=3) {
  const time = floor(currentTime.getTime(), MAX_DURATION);
  const latitude = floor(currentLatitude, CELL_SIZE);
  const longitude = floor(currentLongitude, CELL_SIZE);

  // TODO : timings for previous block as well?

  const seed = SECRET + time + latitude + longitude;
  const genNum = seedrandom(seed);

  let timings = [];
  for (let i = 0; i < n; i++) {
    timings.push({
      startTime: time + random(0, MAX_DURATION, genNum),
      duration: random(MIN_DURATION, MAX_DURATION, genNum),
      latitude: latitude + random(0, CELL_SIZE, genNum),
      longitude: longitude + random(0, CELL_SIZE, genNum),
      orbType: OrbType[orbTypes[randomInt(0, orbTypes.length, genNum)]]
    });
  }
  return timings;
}
