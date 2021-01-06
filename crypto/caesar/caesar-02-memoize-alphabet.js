const message = 'dspttjohuifsvcjdpoabrkttds';

// rot: number of places to advance in the alphabet to get the cleartext
function decodeCaesar(ciphertext, rot) {
  const az = 'abcdefghijklmnopqrstuvwxyz';
  const rotatedAz = az.split('').map((char, i, arr) => {
    const rotatedIndex = i < rot ? az.length - rot + i : i - rot; 
    return az[rotatedIndex];
  });

  return ciphertext.split('').map(char => az[rotatedAz.indexOf(char)]).join('');
}

// Brute force since we don't have the rot key
// (Try 'em all and find something legible)
// for (let i = 0; i < 26; i++) {
//   console.log(decodeCaesar(message, i));
// }
