# 13

More robust implementation of Rot13, based on previous [array-based Caesar solution](../caesar/caesar-03-fewer-iterations-arrays.js).

- Now supports non-alphabetic and mixed-case characters.
- Now uses `null` to explicitly indicate holes in the in-progress solution array.
  (to avoid ambiguity about how JS handles [empty elements](https://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript#empty-elements))
