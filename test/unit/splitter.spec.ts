import { expect } from 'chai';
import { splitInChunks } from '../../src/app/splitter';

describe('String splitter', () => {
  it('Should split in chunks of equal length when string length is a multiple of chunkSize', () => {
    const input = '700000000';
    const expectedResult = ['700', '000', '000'];
    return expect(splitInChunks(input, 3)).to.deep.equal(expectedResult);
  });

  it('Should include one chunk of length 1 < remainder < chunkMaxSize when string length is not a multiple of chunkSize', () => {
    const inputSingleDigit = '7';
    const expectedSingleDigit = ['7'];

    const inputThousandRemainder1 = '7000';
    const expectedThousandRemainder1 = ['7', '000'];

    // Found a bug using this, went from using round to Math.ceil instead when calculating iterations in splitter.ts
    const inputThousandRemainder2 = '70000';
    const expectedThousandRemainder2 = ['70', '000'];

    expect(splitInChunks(inputSingleDigit, 3)).to.deep.equal(
      expectedSingleDigit,
    );
    expect(splitInChunks(inputThousandRemainder1)).to.deep.equal(
      expectedThousandRemainder1,
    );
    return expect(splitInChunks(inputThousandRemainder2, 3)).to.deep.equal(
      expectedThousandRemainder2,
    );
  });

  it('Should include accept a custom length of chunkMaxSize for chunkMaxSize > 1', () => {
    const inputChunk1 = '7000000000000';

    const inputChunk10 = '7000000000000';
    const expectedResultChunk10 = ['700', '0000000000'];

    expect(splitInChunks(inputChunk1, 1)).to.deep.equal(inputChunk1.split(''));
    return expect(splitInChunks(inputChunk10, 10)).to.deep.equal(
      expectedResultChunk10,
    );
  });

  it('Should throw when chunk max size < 1', () => {
    const input = '7';
    return expect(() => splitInChunks(input, 0)).to.throw(
      '[splitter] Chunk size invalid, should be a positive integer, got 0',
    );
  });

  it('Should throw when chunk max size is a float', () => {
    const input = '7';
    return expect(() => splitInChunks(input, 1.2)).to.throw(
      '[splitter] Chunk size invalid, should be a positive integer, got 1.2',
    );
  });

  it('Should throw on empty input', () => {
    const input = '';
    return expect(() => splitInChunks(input, 3)).to.throw(
      '[splitter] Input must not be empty',
    );
  });
});
