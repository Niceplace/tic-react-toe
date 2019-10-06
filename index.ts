import { round } from 'lodash';
import { splitInChunks } from './app/numberSplitter';
/**
 * For a given input, return a boolean indicating if it's valid number (true) or not (false)
 */
const isValidNumber = (input: string) => Number(input) === Number.NaN;

/**
 * Round number to a given # of decimals
 * @param amount Number to round
 * @param numDecimals Number of decimals to round to, defaults to 2
 */
const roundAmount = (amount: number, numDecimals = 2) =>
  round(amount, numDecimals);

/**
 * Formats a number to it's string representation in currency format
 *   From 1000 and up, make space separated groups of three digits + remainder, if exists
 * @param amount A number rounded to a specific precision
 */
const formatNumber = (amount: number) => {
  const split = amount.toString().split('.');
  const leftHandSide = splitInChunks(split[0]).join(' ');
  const rightHandSide = split[1];
  return `${leftHandSide}.${rightHandSide}`;
};

(async () => {
  const input = process.env.INPUT_TOFORMAT || '1234.567';
  if (!isValidNumber(input)) {
    throw new Error(
      'Invalid input specified, expecting integer or floating point number',
    );
  }
  const amountRounded = roundAmount(Number(input));
  const formatted = formatNumber(amountRounded);
  console.log('The money amount is %s', formatted);
})();
