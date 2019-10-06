import { expect } from 'chai';
import { splitInChunks } from '../../app/splitter';

describe('Number splitter', () => {
  it('Should throw when chunk max size < 1', () => {
    const input = '7000000000';
    return expect(() => splitInChunks(input, 0)).to.throw(
      'Cannot split in chunks of less than 1',
    );
  });

  it('Should split in chunks of equal length when string length is a multiple of chunkSize', () => {
    const input = '700000000';
    const expectedResult = ['700', '000', '000'];
    return expect(splitInChunks(input, 3)).to.deep.equal(expectedResult);
  });

  it('Should include one chunk of length 1 < remainder < chunkMaxSize when string length is not a multiple of chunkSize', () => {
    const input1 = '7';
    const expectedResult1 = ['7'];
    // Found a bug using this, went from using round to Math.ceil instead when calculating iterations
    const input2 = '70000';
    const expectedResult2 = ['70', '000'];
    expect(splitInChunks(input1, 3)).to.deep.equal(expectedResult1);
    return expect(splitInChunks(input2, 3)).to.deep.equal(expectedResult2);
  });

  it('Should include one chunk of length 1 < remainder < chunkMaxSize when string length is not a multiple of chunkSize', () => {
    const input = '7000';
    const expectedResult = ['7', '000'];
    return expect(splitInChunks(input)).to.deep.equal(expectedResult);
  });

  it('Should include accept any length of chunkMaxSize for chunkMaxSize > 1', () => {
    const input = '7000000000000';
    const expectedResult = ['7', '0000', '0000', '0000'];
    return expect(splitInChunks(input, 4)).to.deep.equal(expectedResult);
  });
});
