const message = 'dspttjohuifsvcjdpoabrkttds';

// rot: number of places to advance in the alphabet to get the cleartext
function decodeCaesar(ciphertext, rot, debug = false) {
  let cleartext = ciphertext;
  const az = 'abcdefghijklmnopqrstuvwxyz';

  // For very large rotations (or very small, if negative) that are longer than an alphabet,
  // let's simplify it so it works in our conversion formula.
  // E.g. add 2 alphabet lengths to -55 to get -3
  // E.g. remove 3 alphabet lengths from 101 to get 23
  const shift = rot % az.length;

  // Check we have no redundant traversals
  const uniqueCipherChars = [...new Set(ciphertext.split(''))];
  const solvedCipherChars = [];
  let charsExamined = 0;

  for (let i = 0; i < ciphertext.length; i ++) {
    // Only decode unsolved characters
    const cipherChar = ciphertext[i];

    if (!solvedCipherChars.includes(cipherChar)) {
      const cipherIndex = az.indexOf(cipherChar);
      // Improvement on prev formulae: Now works on negative, very large and very small numbers.
      // To get % to behave like a modulo operator in JS, we need this freaky formula.
      // MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
      const clearIndex = (((cipherIndex - shift) % 26 ) + 26 ) % 26;
      const clearChar = az[clearIndex];

      // replace all occurrences of cipherChar
      const cipherRegex = new RegExp(cipherChar, 'g');

      // Temporarily convert replacements to uppercase to avoid re-replacing them.
      cleartext = cleartext.replace(cipherRegex, clearChar.toLocaleUpperCase());
      
      solvedCipherChars.push(cipherChar);

      // Exit once all characters have been decoded
      if (uniqueCipherChars.sort().join('') === solvedCipherChars.sort().join('')) {
        break;
      }
    }

    // Log progress to demonstrate lack of redundant traversal
    if (debug) {
      console.log(cleartext);
    }

    charsExamined += 1;
  }

  if (debug) {
    console.log(`Solved message of length ${ciphertext.length} by examining ${charsExamined} characters`);
    console.log(uniqueCipherChars.length);
  }

  return cleartext.toLocaleLowerCase();
}

// Brute force since we don't have the rot key

// With debugging output to check for lack of redundant traversal
// for (let i = 0; i < 26; i++) {
//   // set debug to 'true' to show progress
//   console.log(decodeCaesar(message, i, true), i, '\n');
// }

// Summarize results so we can manually find one that's legible
for (let i = 0; i < 26; i++) {
  // leave debug at default 'false' to show only results 
  console.log(decodeCaesar(message, i), i);
}

module.exports = decodeCaesar;
