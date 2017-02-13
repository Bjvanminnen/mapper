import { assert } from 'chai';
import { roundedNum } from './createGrid';

describe('createGrid', () => {
  it('roundedNum', () => {
    assert.equal(roundedNum(1.15, 0.2), 1.0);
    assert.equal(roundedNum(0.95, 0.2), 0.8);

    assert.equal(roundedNum(-1.15, 0.2), -1.2);
    assert.equal(roundedNum(-0.95, 0.2), -1.0);
  });
});
