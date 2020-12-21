/** 
 * This approach didn't work. This script was trying to:
 * 
 * Use the encoded char to look up an index of a header row
 *   (e.g. if you think of a spreadsheet, look across the top to find col B),
 * Look up an index of a header column (e.g. look down the left to find row 7 in a spreadsheet),
 * Find the cell that intersects (e.g. the data at B7).
 * 
 * Produces this incorrect flag: MTUFBSQOJGP
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
const splitRows = rows.map(row => row.split(' '));

encoded.forEach((char, i) => {
  // Use the encoded char look up a row.
  const rowQuery = char;

  // Use the corresponding key char to look up a column.
  const colQuery = key[i];

  // Find the index of the row that matches the encoded char.
  const rowMatch = splitRows.filter(row => row[0] === rowQuery)[0];
  const rowIndex = splitRows.indexOf(rowMatch);
  
  // Find the index of the col that matches the key char.
  const colIndex = splitRows[0].indexOf(colQuery);

  // Adjust by -2 to compensate because the column index no longer matches
  // between the header row and the body rows after split
  flag += splitRows[rowIndex][colIndex - 2];
});

console.log(flag);
