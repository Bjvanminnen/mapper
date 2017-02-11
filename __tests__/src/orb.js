import { assert } from 'chai';
import seedrandom from 'seedrandom';

describe('seedrandom', () => {
  it('works', () => {
    const rng = seedrandom('asdf');
    const rng2 = seedrandom('asdf');

    assert.equal(rng(), rng2());
  });
});
