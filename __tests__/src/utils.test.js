import { assert } from 'chai';
import { floor, random } from '../../src/utils';

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

describe('random', () => {
  it('returns min when generator returns 0', () => {
    const generator = () => 0;
    assert.equal(random(5, 10, generator), 5);
  });

  it('returns almost max when generator returns almost 1', () => {
    const generator = () => 0.999999;
    assert.equal(random(5, 10, generator), 9.999995);
  });
});
