/**
 * Rounds number to nearest number of given multiple. Multiple need not be an
 * integer
 * @param {number} number - Number to round
 * @param {number} nearest - window size to round to
 */
export function floor(number, nearest) {
  const multiples = Math.floor(number / nearest);
  return multiples * nearest;
}

/**
 * Return a random number in range [min, max)
 * @param {number} min
 * @param {number} max
 * @param {function?} generator - Function that returns a number in the range
 * of [0, 1)
 */
const baseGenerator = () => Math.random();
export function random(min, max, generator=baseGenerator) {
  return generator() * (max - min) + min;
}

/**
 * Return an integer in the range [min, max)
 */
export function randomInt(min, max, generator=baseGenerator) {
  return Math.floor(random(min, max, generator));
}
