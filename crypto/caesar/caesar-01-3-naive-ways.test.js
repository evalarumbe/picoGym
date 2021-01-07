const decodeCaesar = require('./caesar-01-3-naive-ways');

// As per https://en.wikipedia.org/wiki/Caesar_cipher
// E in the plaintext with a rot of -3 becomes B in the ciphertext

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
