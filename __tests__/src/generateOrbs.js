import { assert } from 'chai';
import { floor } from '../../src/generateOrbs';

describe('floor', () => {
  it('round down for positive numbers', () => {
    assert.equal(floor(1.9, 1), 1);
    assert.equal(floor(1.9, 0.5), 1.5);
  });

  it('round down (up in abs value) for negative numbers', () => {
    assert.equal(floor(-1.9, 1), -2);
    assert.equal(floor(-1.9, 0.5), -2);
    assert.equal(floor(-1.4, 0.5), -1.5);
  });
});
