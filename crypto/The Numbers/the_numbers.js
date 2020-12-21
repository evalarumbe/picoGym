const az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const raw = "16 9 3 15 3 20 6 { 20 8 5 14 21 13 2 5 18 19 13 1 19 15 14 }";

const tokens = raw.split(" ");

let flag = '';

tokens.forEach(tkn => {
  if (typeof +tkn === 'number') {
    flag = flag.concat(az[+tkn-1]);
  } else {
    flag = flag.concat(tkn);
  }
});

console.log(flag);
