import proxyquire from 'proxyquire';
import { expect } from 'chai';

describe('Number formatter', () => {
  it('Should properly format 0 with two decimals', () => {
    const input = 0;
    const expected = '0.00';

    // Mock the splitInChunks function
    const splitInChunksStub = {
      splitInChunks: () => ['0'],
    };
    const mockedFormatter = proxyquire('../../src/app/formatter', {
      './splitter': splitInChunksStub,
    });

    return expect(mockedFormatter.formatNumber(input)).to.equal(expected);
  });

  it('Should format positive & negative integers with two decimals', () => {
    const positiveInput = 123;
    const expectedPositive = '123.00';

    const negativeInput = -123;
    const expectedNegative = '-123.00';

    // Mock the splitInChunks function
    const splitInChunksStub = {
      splitInChunks: () => ['123'],
    };

    const mockedFormatter = proxyquire('../../src/app/formatter', {
      './splitter': splitInChunksStub,
    });

    expect(mockedFormatter.formatNumber(positiveInput)).to.equal(
      expectedPositive,
    );
    return expect(mockedFormatter.formatNumber(negativeInput)).to.equal(
      expectedNegative,
    );
  });

  it('Should format already rounded positive & negative floating point numbers', () => {
    const positiveInput = 123.45;
    const expectedPositive = '123.45';

    const negativeInput = -123.45;
    const expectedNegative = '-123.45';

    // Mock the splitInChunks function
    const splitInChunksStub = {
      splitInChunks: () => ['123'],
    };

    const mockedFormatter = proxyquire('../../src/app/formatter', {
      './splitter': splitInChunksStub,
    });

    expect(mockedFormatter.formatNumber(positiveInput)).to.equal(
      expectedPositive,
    );
    return expect(mockedFormatter.formatNumber(negativeInput)).to.equal(
      expectedNegative,
    );
  });
});
