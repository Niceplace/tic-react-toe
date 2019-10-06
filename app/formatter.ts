import { splitInChunks } from './splitter';

/**
 * Formats a number to it's string representation in currency format
 *   From 1000 and up, make space separated groups of three digits + remainder, if exists
 * @param amount A number rounded to a specific precision
 */
const formatNumber = (amount: number) => {
  const split = Math.abs(amount)
    .toString()
    .split('.');
  const leftHandSide = splitInChunks(split[0]).join(' ');
  // If split[1] is undefined, amount was an integer
  const rightHandSide = split[1] || '00';
  return `${amount < 0 ? '-' : ''}${leftHandSide}.${rightHandSide}`;
};

export { formatNumber };
