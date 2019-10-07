/**
 * For a given input string, named 'chunkee'. Split it into equal portions or size 'chunkSize'
 *  If a remainder exists (a leftover of the string which length 1 < length < chunkSize), it will always be the first chunk
 * @param chunkee The string that needs to be chunked
 * @param chunkSize The size of the chunks
 */
const chunker = (chunkee: string, chunkSize: number) => {
  const remainder = chunkee.length % chunkSize;
  const iterations = Math.ceil(chunkee.length / chunkSize);

  const chunks: string[] = [];
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
        counter === 0 ? -1 * chunkSize : -1 * (chunkSize + counter * chunkSize);
      endIndex = counter === 0 ? undefined : startIndex + chunkSize;
    }
    // Push each chunk of string, to the front of the array
    chunks.unshift(chunkee.slice(startIndex, endIndex));
  }
  return chunks;
};

/**
 * Orchestrate splitting a string in an array of 1 < length < chunkMaxSize
 *   If the input's length <= chunkSize, returns an array containing the string
 *   Otherwise, it will return the contents of 'chunker'
 * @param toSplit String to be split
 * @param chunkMaxSize A positive integer representing the maximum size of the character chunk,
 */
const splitInChunks = (toSplit: string, chunkMaxSize = 3) => {
  if (chunkMaxSize < 1 || !Number.isInteger(chunkMaxSize)) {
    throw new Error(
      `[splitter] Chunk size invalid, should be a positive integer, got ${chunkMaxSize}`,
    );
  }

  const inputLength = toSplit.length;
  if (!inputLength) {
    throw new Error('[splitter] Input must not be empty');
  }

  const chunks: string[] = [];

  // console.log('Iterations %s, remainder %s', iterations, remainder);

  // No need to go through the loop if our input fits in a single chunk
  if (inputLength <= chunkMaxSize) {
    chunks.push(toSplit);
  } else {
    chunks.push(...chunker(toSplit, chunkMaxSize));
  }

  return chunks;
};

export { splitInChunks };
