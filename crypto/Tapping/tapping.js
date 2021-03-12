const path = require('path');
const fs = require('fs');

function getCiphertext() {
  return fs.readFileSync(path.join(__dirname, 'ciphertext.txt'), 'utf8');
}

function solveMorse(rawCiphertext) {
  // Clean up leading / trailing spaces so they're not mistaken for delimiters
  const ciphertext = rawCiphertext.trim();
  let cleartext = '';

  function solveChar(cipherChar) {
    const characters = {
      A: '.-',
      B: '-...',
      C: '-.-.',
      D: '-..',
      E: '.',
      F: '..-.',
      G: '--.',
      H: '....',
      I: '..',
      J: '.---',
      K: '-.-',
      L: '.-..',
      M: '--',
      N: '-.',
      O: '---',
      P: '.--.',
      Q: '--.-',
      R: '.-.',
      S: '...',
      T: '-',
      U: '..-',
      V: '...-',
      W: '.--',
      X: '-..-',
      Y: '-.--',
      Z: '--..',
      0: '-----',
      1: '.----',
      2: '..---',
      3: '...--',
      4: '....-',
      5: '.....',
      6: '-....',
      7: '--...',
      8: '---..',
      9: '----.',
    };

    const clearChar = Object.keys(characters).find(
      (key) => characters[key] === cipherChar
    );

    // If the char doesn't exist, return the input char
    return clearChar || cipherChar;
  }

  function solveWord(cipherWord) {
    const cipherChars = cipherWord.split(' ');
    const clearChars = cipherChars.map((char) => solveChar(char));
    return clearChars.join('');
  }

  function solvePhrase(cipherPhrase) {
    const cipherWords = cipherPhrase.split(' / ');
    const clearWords = cipherWords.map((word) => solveWord(word));
    return clearWords.join(' ');
  }

  // Determine whether to process input as a phrase, word or char.

  if (ciphertext.match(/ {2}/)) {
    throw new Error(
      'Malformed spaces. Expected " " between letters and " / " between words. Found at least one double space.'
    );
  } else if (ciphertext.match(/ \/ /)) {
    cleartext = solvePhrase(ciphertext);
  } else if (ciphertext.match(/ /)) {
    cleartext = solveWord(ciphertext);
  } else {
    cleartext = solveChar(ciphertext);
  }

  return cleartext;
}

console.log(solveMorse(getCiphertext()));

module.exports = solveMorse;
