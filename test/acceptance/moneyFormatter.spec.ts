import { expect } from 'chai';
import { parseToNumber } from '../../app/parser';
import { formatNumber } from '../../app/formatter';

describe('Currency converter', () => {
  it('Should format a positive integer with two decimals', () => {
    const input = 1;
    const parsedInput = parseToNumber(input);
    const expected = '1.00';

    return expect(formatNumber(parsedInput)).to.equal(expected);
  });

  it('Should format a positive floating point number, rounding to the nearest cent', () => {
    const input = 123.456;
    const parsedInput = parseToNumber(input);
    const expected = '123.46';

    return expect(formatNumber(parsedInput)).to.equal(expected);
  });

  it('Should format a negative integer with two decimals', () => {
    const input = -1;
    const parsedInput = parseToNumber(input);
    const expected = '-1.00';

    return expect(formatNumber(parsedInput)).to.equal(expected);
  });

  it('Should format a negative floating point number, rounding to the nearest cent', () => {
    const input = -123.456;
    const parsedInput = parseToNumber(input);
    const expected = '-123.46';

    return expect(formatNumber(parsedInput)).to.equal(expected);
  });

  it('Should format multiple of 1000 in space separated groups of three digits', () => {
    const input = 12345678.456;
    const parsedInput = parseToNumber(input);
    const expected = '12 345 678.46';

    return expect(formatNumber(parsedInput)).to.equal(expected);
  });
});
