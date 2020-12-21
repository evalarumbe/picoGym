/** 
 * Find the column indices of each solved char.
 * Look down each column to find the corresponding encoded char,
 *   and save the index of the matching row.
 * Find the decoded char at the start of the matching row.
 * 
 * Third time's a charm 😎
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

// Find the column indices of each key char
key.forEach((char, i) => {
  const colIndex = rows[0].indexOf(char);
  colIndices.push(colIndex);
});

// Look down each column to find the corresponding encoded char
colIndices.forEach((colIndex, i) => {
  console.log(`\nkey char:\t\t\t${key[i]}`);
  console.log(`key char in table header:\t${rows[0][colIndex]}`);
  console.log(`col index of key char:\t${colIndex}`);
  
  const rowMatch = rows.filter(row => row[colIndex] === encoded[i])[0];
  console.log(`matching row:\t\t\t${rowMatch}`);

  console.log(`encoded char:\t\t\t${encoded[i]}`)
  console.log(`encoded char in column:\t\t${rowMatch[colIndex]}`)
  console.log(`decoded char at start of row:\t${rowMatch[0]}`);

  // Find the decoded char at the start of the matching row
  flag += rowMatch[0];
});

console.log(`\nflag: ${flag}`);
