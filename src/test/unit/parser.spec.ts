import { expect } from 'chai';
import { parseToNumber } from '../../app/parser';

describe('Number parser', () => {
  it('Should split in chunks of equal length when string length is a multiple of chunkSize', () => {
    const inputFloating = '123.456';
    const expectedFloating = 123.46;

    const inputInteger = '123456';
    const expectedInteger = 123456;

    expect(parseToNumber(inputFloating)).to.equal(expectedFloating);
    return expect(parseToNumber(inputInteger)).to.equal(expectedInteger);
  });

  it('Should throw if input is not integer or floating point', () => {
    const input = 'definitelynotanumber';
    return expect(() => parseToNumber(input)).to.throw(
      'Invalid input specified, expecting integer or floating point number',
    );
  });
});
