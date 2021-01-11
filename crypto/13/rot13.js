// rot: number of places to advance in the alphabet to get the cleartext
function decodeCaesar(ciphertext, rot, debug = false) {
  // Start the solution with placeholder underscores
  const cleartext = Array(ciphertext.length).fill('_');

  const az = 'abcdefghijklmnopqrstuvwxyz';
  
  // Prepare ciphertext for array iteration
  const splitCiphertext = ciphertext.split('');
  
  // For very large rotations (or very small, if negative) that are longer than an alphabet,
  // let's simplify it so it works in our conversion formula.
  // E.g. add 2 alphabet lengths to -55 to get -3
  // E.g. remove 3 alphabet lengths from 101 to get 23
  const shift = rot % az.length;

  // Check we have no redundant traversals
  const uniqueCipherChars = [...new Set(ciphertext.split(''))];
  const solvedCipherChars = [];
  let charsExamined = 0;
  
  // examine each char in the ciphertext to check whether it needs replacing
  for (let i = 0; i < splitCiphertext.length; i ++) {
    const cipherChar = splitCiphertext[i];
    let lowercase = true;
    
    // If this char is alphabetical and still unsolved, decode it.
    if (cipherChar.match(/[a-zA-Z]/) && cleartext[i] === '_') {

      if (!cipherChar.match(/[a-z]/)) {
        lowercase = false;
      }

      const cipherIndex = lowercase ?
        az.indexOf(cipherChar) :
        az.toLocaleUpperCase().indexOf(cipherChar);

      // Modulo makes this work on negative, very large and very small numbers.
      // To get % to behave like a modulo operator in JS, we need this freaky formula.
      // MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
      const clearIndex = (((cipherIndex - shift) % 26 ) + 26 ) % 26;

      const clearChar = lowercase ? 
        az[clearIndex] :
        az.toLocaleUpperCase()[clearIndex];

      let occurrenceIndex = i;

      // check for all occurrences of the current char, and replace them
      while (occurrenceIndex !== -1) {
        cleartext[occurrenceIndex] = clearChar;
        occurrenceIndex = splitCiphertext.indexOf(cipherChar, occurrenceIndex + 1);

        // Demonstrate lack of redundant traversal
        // ...by tracking each unique character decoded
        if (!solvedCipherChars.includes(cipherChar)) {
          solvedCipherChars.push(cipherChar);
        }
        // ...and by logging progress so we can see each replacement
        if (debug) {
          console.log(cleartext.join(''));
        }
      }

      // Exit once all characters have been decoded
      if (!cleartext.includes('_')) {
        break;
      }
    // If this char is non-alphabetical and still unsolved, use it as is
    } else if (!cipherChar.match(/[a-zA-Z]/) && cleartext[i] === '_') {
      cleartext[i] = ciphertext[i];
    }

    charsExamined += 1;
  }

  if (debug) {
    console.log(`Solved message of length ${ciphertext.length} with ${uniqueCipherChars.length} unique characters. Examined ${charsExamined} characters and replaced ${solvedCipherChars.length} of them.`);
  }

  return cleartext.join('');
}

// set debug to 'true' to show progress
console.log(decodeCaesar('cvpbPGS{abg_gbb_onq_bs_n_ceboyrz}', 13, true))

module.exports = decodeCaesar;
