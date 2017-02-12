import { assert } from 'chai';
import { getRandomOrbs } from '../../src/orb';

describe('getRandomOrbs', () => {
  it('consistently returns the same thing', () => {
    const time = new Date('Sat Feb 11 2017 14:55:19 GMT-0800 (PST)');
    const latitude = 37.785834;
    const longitude = -122.406417;
    const orbs1 = getRandomOrbs(latitude, longitude, time);
    const orbs2 = getRandomOrbs(latitude, longitude, time);

    assert.deepEqual(orbs1, orbs2);
  });
});
