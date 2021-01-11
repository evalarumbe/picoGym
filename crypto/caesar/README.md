# Caesar

## The game

A lowercase encrypted message is provided (ciphertext), which can be decrypted into cleartext (aka plaintext) by shifting all characters by the same number of places in a standard 26-letter lower-case alphabet (no upper case, no diacritics, no funny business).

I.e. if `e` decodes to `b` then `f` must decode to `c`.

The rotation (rot) is unknown, but the 26-char alphabet is limited enough that we can try them all by brute force and look manually for a decoded message that looks readable.

## Implementation

A function `decodeCaesar` takes two arguments:

- an encoded message as a string
- a rotation as a number (number of chars to shift by)

It returns a decoded message as a string.

## The approach(es)

My goal was to think through the problem myself, rather than studying existing solutions. I ended up picking up a hint or two as I went, but the focus was on independent problem solving.

Having enjoyed doing these puzzles with pen and paper as a kid, I managed to hugely underestimate the complexity of finding a systematized solution :D

I decided to stick this one out and make it a little more robust than some of my earlier scripts. Here's the evolution of my approach to this one, across several rewrites:

### [caesar-01-3-naive-ways](./caesar-01-3-naive-ways.js)

Goal: Account for the fact that the alphabet has a beginning and an end, but the rotation needs to be circular (i.e. `y` + 2 characters = `a`).

Assumptions: all rotation values are be between 0 and 26.

### [caesar-02-memoize-alphabet](./caesar-02-memoize-alphabet.js)

_Note: I didn't test performance for any of these implementations, this just seemed like a worthwhile exercise._

Goal: Implement memoization (i.e. do the potentially expensive conversion up-front) and preload decoded characters in an array for fast retrieval.

***

### Pause, reflect and implement testing

It was at about this point that things started going horribly wrong and I figured I'd best set up some unit tests, and test for a wider variety of inputs while I'm at it.

It turns out that the prev solutions fail a lot of tests.

I decided to keep old solutions for posterity, to show the process in all its embarrassing integrity, and focus on making the tests pass in new versions.

Along this journey, I read about using modulo to enforce parameter bounds (working with rotations that exceed the length of several alphabets, e.g. converting rot 75 to its equivalent rot 23), which simplified the formula for the later versions.

I also learned some horrible things about the non-standardized implementations of modulo across programming languages, particularly when dealing with negative numbers. Noted.

***

### [caesar-03-fewer-iterations-arrays](./caesar-03-fewer-iterations-arrays.js)

Goals:

- Reduce redundant traversal. Each unique character only needs to be decoded once, even if the character appears several times in the message (the previous approach of preloading the whole alphabet also seems superfluous, since some chars may not appear in the message).

- Simplify the conversion formula by using modulo

### [caesar-04-fewer-iterations-regex](./caesar-04-fewer-iterations-regex.js)

Goal: Same as above, this time with regex.

<!-- TODO -->
Next time: expand solution to handle mixed-case strings (pass similar tests to [13](../13/) challenge)

## Elaboration

The following challenge [13](../13/) elaborates on this one.
