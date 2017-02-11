export function floor(number, nearest) {
  const multiples = Math.floor(number / nearest);
  return multiples * nearest;
}
