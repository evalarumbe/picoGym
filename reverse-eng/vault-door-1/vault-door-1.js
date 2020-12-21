const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, 'vault-door-1.java');
const fileData = fs.readFileSync(filePath, 'utf8');

// find all lines containing 'password.charAt' and trim them

'password.charAt('.length

const pwd = (
  fileData
    .split('\n') // get lines from file
    .filter(line => (/password.charAt/).test(line)) // keep only relevant lines
    .sort((a, b) => { // find the index in each line and sort accordingly
      // regex: find the first number between literal parens: escaped \( and \)
      // but use non-escaped parens to only capture the number in between
      // (could have just got the first number in this case, but this was fun)
      const aIndex = a.match(/\((\d+)\)/)[1];
      const bIndex = b.match(/\((\d+)\)/)[1];
      return +aIndex < +bIndex ? -1 : 1;
    })
    .map(line => line.match(/\'(.)\'/)[1]) // grab the char between quotes
    .join('') // produce a string
);

console.log(pwd);
