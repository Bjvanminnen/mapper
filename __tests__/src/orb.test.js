import { assert } from 'chai';
import { getTimings } from '../../src/orb';

describe('getTimings', () => {
  it('consistently returns the same thing', () => {
    const time = new Date('Sat Feb 11 2017 14:55:19 GMT-0800 (PST)');
    const timings1 = getTimings(time);
    const timings2 = getTimings(time);

    assert.deepEqual(timings1, timings2);
  });
});
