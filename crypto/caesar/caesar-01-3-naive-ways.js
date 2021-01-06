const message = 'dspttjohuifsvcjdpoabrkttds';

// rot: number of places to advance in the alphabet to get the cleartext
function decodeCaesar(ciphertext, rot) {
  let cleartext = '';
  const az = 'abcdefghijklmnopqrstuvwxyz';
  
  ciphertext.split('').forEach(cipherChar => {
    const cipherIndex = az.indexOf(cipherChar.toLowerCase());
    
    // We need a new index between 0 and 25 (az.length - 1) inclusive. A few ways we could get it:
    
    // Method 1: Choose a formula depending on whether cipherIndex is before or after the rot index
    // const clearIndex = cipherIndex < rot ? az.length - rot + cipherIndex : cipherIndex - rot;
    
    // Method 2: Always choose the first formula, and adjust if the result is too low.
    let clearIndex = cipherIndex - rot;
    if (clearIndex < 0) {
      clearIndex = az.length + clearIndex;
    }
    
    // Method 3: Always choose the second formula, and adjust if the result is too high.
    // let clearIndex = az.length - rot + cipherIndex;
    // if (clearIndex >= az.length) {
    //   clearIndex = clearIndex - az.length;
    // }

    cleartext += az[clearIndex];
  });

  return cleartext;
}

// Brute force since we don't have the rot key
// (Try 'em all and find something legible)
for (let i = 0; i < 26; i++) {
  console.log(decodeCaesar(message, i));
}
