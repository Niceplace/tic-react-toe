describe('Currency converter', () => {
  it('Should format floating numbers, rounding to the nearest cent');
  it('Should format negative numbers');
  it(
    'Should format multiple of 1000 in space separated groups of three digits',
  );
  it('Should parse negative numbers');
  it('Should parse integers and format with two decimals (00)');
  it('Should throw error when parsing non-number');
});
