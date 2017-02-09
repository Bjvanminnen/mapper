import { OrbType } from './redux/orbs';
import _ from 'lodash';

export function floor(number, nearest) {
  const multiples = Math.floor(number / nearest);
  return multiples * nearest;
}

/**
 * Generates a set of orbs within a square box. That square has a height/width
 * @param {number} lat - Latitude in degress
 * @param {number} long - Longitude in degress
 * @param {number} numOrbs - How many orbs to create
 * @param {number?} boxSize - Size of the box in which we might create orbs
 * @returns {{latitude, longitude, type}[]}
 */
 // TODO: write tests
export default function generateOrbs(lat, long, numOrbs, boxSize=0.01) {
  const top = floor(lat, boxSize);
  const left = floor(long, boxSize);
  const types = Object.keys(OrbType);

  let orbs = [];
  for (let i = 0; i < numOrbs; i++) {
    // TODO - what happens near 0? and with negatives
    orbs.push({
      latitude: top + Math.random() * boxSize,
      longitude: left + Math.random() * boxSize,
      type: _.sample(types)
    });
  }

  return orbs;
}
