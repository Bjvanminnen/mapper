import seedrandom from 'seedrandom';
import { PropTypes } from 'react';
import { floor, random, randomInt } from './utils';

export const OrbType = {
  Red: 'Red',
  Green: 'Green',
  Blue: 'Blue'
};
const orbTypes = Object.keys(OrbType);

export const OrbShape = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  orbType: PropTypes.oneOf(Object.keys(OrbType)).isRequired,
  startTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
});

const SECRET = 'secret';
const MIN_DURATION = 1000 * 60 * 5; // 5 minutes
const MAX_DURATION = 1000 * 60 * 20; // 20 minutes
const TIME_BLOCK_SIZE = MAX_DURATION;
const CELL_SIZE = 0.01;

/**
 * Orbs are grouped into blocks of space and time. Each block has its own key.
 */
export function orbBlockKey(latitude, longitude, time) {
  return `${latitude}_${longitude}_${time}`;
}

// TODO - best place for this to live?
export function timeBlockStart(time) {
  return floor(time, TIME_BLOCK_SIZE);
}

/**
 * Divide time into blocks of MAX_DURATION.
 * Divide world into cells that are CELL_SIZE degrees wide and high.
 * Create n randomized orbs in a way such that the if the provided inputs are in
 * the same time block/location cell, they result in the same outputs.
 * @param {number} currentLatitude - latitude in degrees
 * @param {number} currentLongitude - longitude in degress
 * @param {number} currentTime - current time in ms
 * @param {TODO}
 */
export function getRandomOrbs(currentLatitude, currentLongitude, currentTime, n=3) {
  const time = timeBlockStart(currentTime);
  const latitude = floor(currentLatitude, CELL_SIZE);
  const longitude = floor(currentLongitude, CELL_SIZE);

  const key = orbBlockKey(latitude, longitude, time);
  const seed = SECRET + key;
  const genNum = seedrandom(seed);

  let orbs = [];
  for (let i = 0; i < n; i++) {
    orbs.push({
      startTime: time + random(0, MAX_DURATION, genNum),
      duration: random(MIN_DURATION, MAX_DURATION, genNum),
      latitude: latitude + random(0, CELL_SIZE, genNum),
      longitude: longitude + random(0, CELL_SIZE, genNum),
      orbType: OrbType[orbTypes[randomInt(0, orbTypes.length, genNum)]]
    });
  }
  return {
    key,
    time,
    orbs
  };
}

/**
 * @param {Orb} orb
 * @param {number} currentTime - in milliseconds
 * @returns {boolean} True if the current time falls within the orbs active window
 **/
export function orbIsActive(orb, currentTime) {
  if (currentTime < orb.startTime || currentTime > orb.startTime + orb.duration) {
    return false;
  }
  return true;
}
