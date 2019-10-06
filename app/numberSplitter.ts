/**
 * Split a string in an array of characters of 0 < length < chunkMaxSize
 * @param toSplit String to be split
 * @param chunkMaxSize maximum size of the character chunk
 */
const splitInChunks = (toSplit: string, chunkMaxSize = 3) => {
  if (chunkMaxSize <= 1) {
    throw new Error('Cannot split in chunks of less than 1');
  }
  const chunks: string[] = [];
  const inputLength = toSplit.length;
  const remainder = inputLength % chunkMaxSize;

  const iterations = Math.ceil(inputLength / chunkMaxSize);

  console.log('Iterations %s, remainder %s', iterations, remainder);

  for (let counter = 0; counter < iterations; counter += 1) {
    // Start from string end and walk backwards but slice left to right, one chunkSize at a time
    let startIndex: number;
    let endIndex: number | undefined;

    // If a remainder exist, treat the last step differently
    //   - It begins where the string begins
    //   - Its length === the remainder
    if (counter === iterations - 1 && remainder > 0) {
      startIndex = 0;
      endIndex = remainder;
    } else {
      //  All index calculations follow the same rule, except for
      //    - the first iteration
      //    - the last iteration, only if a remainder exist
      startIndex =
        counter === 0
          ? -1 * chunkMaxSize
          : -1 * (chunkMaxSize + counter * chunkMaxSize);
      endIndex = counter === 0 ? undefined : startIndex + chunkMaxSize;
    }
    // Push each chunk of string, to the front of the array
    chunks.unshift(toSplit.slice(startIndex, endIndex));
  }

  // Start from string end and loop
  return chunks;
};

export { splitInChunks };
