const decodeCaesar = require('./caesar-03-fewer-iterations-arrays');

// As per https://en.wikipedia.org/wiki/Caesar_cipher
// E in the cleartext with a rot of -3 becomes B in the ciphertext

// Rot -3 and 23
//  clearIndex: 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
//   clearChar: a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z
// cipherIndex: 23 24 25 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22
//  cipherChar: x  y  z  a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w
describe('Negative rotation (verifiable example from WikiPedia)', () => {
  describe('rot -3 (equivalent to 23)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', -3)).toBe('d');
      expect(decodeCaesar('b', -3)).toBe('e');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', -3)).toBe('b');
      expect(decodeCaesar('z', -3)).toBe('c');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', -3)).toBe('debc');
    });
    test('same algo does NOT work in reverse', () => {
      expect(decodeCaesar('debc', -3)).not.toBe('abyz');
    });
  });

  describe('rot 23 (equivalent to -3)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', 23)).toBe('d');
      expect(decodeCaesar('b', 23)).toBe('e');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', 23)).toBe('b');
      expect(decodeCaesar('z', 23)).toBe('c');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', 23)).toBe('debc');
    });
    test('same algo does NOT work in reverse', () => {
      expect(decodeCaesar('debc', 23)).not.toBe('abyz');
    });
  });
});

describe('Rotations that exceed alphabet length', () => {
  // remember this is equivalent to rot 23
  describe('rot -55 (rot -3 minus 2 alphabet lengths)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', -55)).toBe('d');
      expect(decodeCaesar('b', -55)).toBe('e');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', -55)).toBe('b');
      expect(decodeCaesar('z', -55)).toBe('c');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', -55)).toBe('debc');
    });
    test('same algo does NOT work in reverse', () => {
      expect(decodeCaesar('debc', -55)).not.toBe('abyz');
    });
  });
  // remember this is equivalent to rot -3
  describe('rot 101 (rot 23 plus 3 alphabet lengths)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', 101)).toBe('d');
      expect(decodeCaesar('b', 101)).toBe('e');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', 101)).toBe('b');
      expect(decodeCaesar('z', 101)).toBe('c');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', 101)).toBe('debc');
    });
    test('same algo does NOT work in reverse', () => {
      expect(decodeCaesar('debc', 101)).not.toBe('abyz');
    });
  });
});

describe('Rotations that don\'t alter the ciphertext', () => {
  describe('rot 0 (equivalent to 26)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', 0)).toBe('a');
      expect(decodeCaesar('b', 0)).toBe('b');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', 0)).toBe('y');
      expect(decodeCaesar('z', 0)).toBe('z');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', 0)).toBe('abyz');
    });
  });

  describe('rot 26 (equivalent to 0)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', 26)).toBe('a');
      expect(decodeCaesar('b', 26)).toBe('b');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', 26)).toBe('y');
      expect(decodeCaesar('z', 26)).toBe('z');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', 26)).toBe('abyz');
    });
  });
});

// Rot 13 and -13
//  clearIndex: 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
//   clearChar: a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z
// cipherIndex: 13 14 15 16 17 18 19 20 21 22 23 24 25 0  1  2  3  4  5  6  7  8  9  10 11 12
//  cipherChar: n  o  p  q  r  s  t  u  v  w  x  y  z  a  b  c  d  e  f  g  h  i  j  k  l  m
describe('Same algorithm for decoding and encoding', () => {
  describe('rot 13 (equivalent to -13)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', 13)).toBe('n');
      expect(decodeCaesar('b', 13)).toBe('o');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', 13)).toBe('l');
      expect(decodeCaesar('z', 13)).toBe('m');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', 13)).toBe('nolm');
    });
    test('same algo works in reverse', () => {
      expect(decodeCaesar('nolm', 13)).toBe('abyz');
    });
  });

  describe('rot -13 (equivalent to 13)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', -13)).toBe('n');
      expect(decodeCaesar('b', -13)).toBe('o');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', -13)).toBe('l');
      expect(decodeCaesar('z', -13)).toBe('m');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', -13)).toBe('nolm');
    });
    test('same algo works in reverse', () => {
      expect(decodeCaesar('nolm', -13)).toBe('abyz');
    });
  });
});

// Rot 1 and 27
//  clearIndex: 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
//   clearChar: a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z
// cipherIndex: 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 0
//  cipherChar: b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z  a
describe('Extra large rotation (> alphabet length of 26)', () => {
  describe('rot 1 (equivalent to 27)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', 1)).toBe('z');
      expect(decodeCaesar('b', 1)).toBe('a');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', 1)).toBe('x');
      expect(decodeCaesar('z', 1)).toBe('y');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', 1)).toBe('zaxy');
    });
    test('same algo does NOT work in reverse', () => {
      expect(decodeCaesar('zaxy', 1)).not.toBe('abyz');
    });
  });

  describe('rot 27 (equivalent to 1)', () => {
    test('beginning of alphabet', () => {
      expect(decodeCaesar('a', 27)).toBe('z');
      expect(decodeCaesar('b', 27)).toBe('a');
    });
    test('end of alphabet', () => {
      expect(decodeCaesar('y', 27)).toBe('x');
      expect(decodeCaesar('z', 27)).toBe('y');
    });
    test('multi-char string', () => {
      expect(decodeCaesar('abyz', 27)).toBe('zaxy');
    });
    test('same algo does NOT work in reverse', () => {
      expect(decodeCaesar('zaxy', 27)).not.toBe('abyz');
    });
  });
});
