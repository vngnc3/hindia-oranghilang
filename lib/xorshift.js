// XORSHIFT: PRNG with two seeds to set its deterministic output.
// state0 and state1 are integer seeds and *must* be passed as an argument.
// change state0 & state1 to affect the apparent randomness of the outcome.
// xorshift() function returns a pseudo-random integer based on seed.

function xorshift(state0, state1) {
    // Returns a pseudo-random integer.

    let s1 = state0; 
    let s0 = state1; 
    state0 = s0;  

    /* SHIFTS - Just as with the seed values, the shift values (23, 17, and 26 here) must be 
    carefully chosen to lengthen the algorithm's period (the number of iterations before you 
    encounter repetition). Try changing these to see how the outcome is affected. */

    s1 ^= s1 << 23;  // SHIFT
    s1 ^= s1 >> 17;  // SHIFT
    s1 ^= s0;
    s1 ^= s0 >> 26;  // SHIFT
    state1 = s1;

   return state0 + state1;
}