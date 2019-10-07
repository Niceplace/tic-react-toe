import { round } from 'lodash';

/**
 * For a given input, return a boolean indicating if it's valid number (true) or not (false)
 */
const isValidNumber = (input: string) => !Number.isNaN(Number(input));

/**
 * Round number to a given # of decimals
 * @param amount Number to round
 * @param numDecimals Number of decimals to round to, defaults to 2
 */
const roundAmount = (amount: number, numDecimals = 2) =>
  round(amount, numDecimals);

const parseToNumber = (input: string) => {
  if (!isValidNumber(input)) {
    throw new Error(
      'Invalid input specified, expecting integer or floating point number',
    );
  }
  return roundAmount(Number(input));
};

export { parseToNumber };
