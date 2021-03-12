const solveMorse = require('./tapping');

// International Morse Code as per https://en.wikipedia.org/wiki/Morse_code

describe('Letters', () => {
  test('International standard', () => {
    expect(solveMorse('-.-.')).toBe('C');
  });

  test('Dots', () => {
    expect(solveMorse('.')).toBe('E');
    expect(solveMorse('..')).toBe('I');
    expect(solveMorse('...')).toBe('S');
  });

  test('Dashes', () => {
    expect(solveMorse('-')).toBe('T');
    expect(solveMorse('--')).toBe('M');
    expect(solveMorse('---')).toBe('O');
  });

  test('Dots and dashes', () => {
    // dots then dashes
    expect(solveMorse('..-')).toBe('U');
    expect(solveMorse('...-')).toBe('V');
    // dashes then dots
    expect(solveMorse('-..')).toBe('D');
    expect(solveMorse('--.')).toBe('G');
    // dots in dashes
    expect(solveMorse('--.-')).toBe('Q');
    expect(solveMorse('-..-')).toBe('X');
    // dashes in dots
    expect(solveMorse('..-.')).toBe('F');
    expect(solveMorse('.-..')).toBe('L');
  });
});

describe('Digits (as strings)', () => {
  test('', () => {
    expect(solveMorse('-----')).toBe('0');
    expect(solveMorse('.----')).toBe('1');
    expect(solveMorse('.....')).toBe('5');
    expect(solveMorse('----.')).toBe('9');
  });
});

describe('Words', () => {
  test('', () => {
    expect(solveMorse('-- --- .-. ... .')).toBe('MORSE');
    expect(
      solveMorse('.--. .- ... ... .-- --- .-. -.. .---- ..--- ...-- ....-')
    ).toBe('PASSWORD1234');
  });
});

describe('Phrases', () => {
  test('', () => {
    expect(solveMorse('.... . .-.. .-.. --- / .-- --- .-. .-.. -..')).toBe(
      'HELLO WORLD'
    );
    expect(
      solveMorse(
        '- .... . / --.- ..- .. -.-. -.- / ..-. --- -..- / .--- ..- -- .--. ... / --- ...- . .-. / - .... . / .-.. .- --.. -.-- / -.. --- --.'
      )
    ).toBe('THE QUICK FOX JUMPS OVER THE LAZY DOG');
    expect(
      solveMorse('----. ----. / .-. . -.. / -... .- .-.. .-.. --- --- -. ...')
    ).toBe('99 RED BALLOONS');
  });
});

describe('Detect malformed spaces', () => {
  test('Bad input: double spaces', () => {
    expect(() => {
      solveMorse('...  ---  ...');
    }).toThrow(Error);
    expect(() => {
      solveMorse('...---            ...');
    }).toThrow(Error);
  });
  test('Acceptable input: leading and trailing spaces', () => {
    expect(() => {
      solveMorse('  ...---...');
    }).not.toThrow(Error);
    expect(() => {
      solveMorse('...---...  ');
    }).not.toThrow(Error);
    expect(() => {
      solveMorse(' ...---...  ');
    }).not.toThrow(Error);
    expect(solveMorse(' ... --- ...  ').length).toBe(3);
  });
});
