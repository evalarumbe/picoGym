/** 
 * This approach didn't work. This script was trying to:
 * 
 * Find the column indices of each encoded char.
 * Look down each column to find the corresponding key char,
 *   and save the index of the matching row.
 * Find the decoded char at the start of the matching row.
 * 
 * Produces this incorrect flag: YJCLHMSIVGN
 */

fs = require('fs');
path = require('path');

let flag = '';
const encoded = "UFJKXQZQUNB".split('');
const key = "SOLVECRYPTO".split('');

// Create a 2D array from the table
const filepath = path.join(__dirname, 'table.txt');
const table = fs.readFileSync(filepath, 'utf8');
const rows = table.split('\n');

const colIndices = [];

// Find the column indices of each encoded char
encoded.forEach((char, i) => {
  const colIndex = rows[0].indexOf(char);
  colIndices.push(colIndex);
});

// Look down each column to find the corresponding key char
colIndices.forEach((colIndex, i) => {
  console.log(`\nencoded char:\t\t\t${encoded[i]}`);
  console.log(`encoded char in table header:\t${rows[0][colIndex]}`);
  console.log(`col index of encoded char:\t${colIndex}`);
  
  const rowMatch = rows.filter(row => row[colIndex] === key[i])[0];
  console.log(`matching row:\t\t\t${rowMatch}`);

  console.log(`key char:\t\t\t${key[i]}`)
  console.log(`key char in column:\t\t${rowMatch[colIndex]}`)
  console.log(`decoded char at start of row:\t${rowMatch[0]}`);

  // Find the decoded char at the start of the matching row
  flag += rowMatch[0];
});

console.log(`\nflag: ${flag}`);
