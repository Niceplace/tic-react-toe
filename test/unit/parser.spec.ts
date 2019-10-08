import { expect } from 'chai';
import { parseNumber } from '../../src/app/parser';

describe('Number parser', () => {
  it('Should split in chunks of equal length when string length is a multiple of chunkSize', () => {
    const inputFloating = '123.456';
    const expectedFloating = 123.46;

    const inputInteger = '123456';
    const expectedInteger = 123456;

    expect(parseNumber(inputFloating)).to.equal(expectedFloating);
    return expect(parseNumber(inputInteger)).to.equal(expectedInteger);
  });

  it('Should throw if input is not integer or floating point', () => {
    const input = 'definitelynotanumber';
    return expect(() => parseNumber(input)).to.throw(
      'Invalid input specified, expecting integer or floating point number',
    );
  });
});
