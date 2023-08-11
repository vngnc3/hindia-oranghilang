// ██ prngByTime.js ███████████████████████████

// Deterministically return a pseudo-random integer by time.
// One-second epoch interval.

let startTime = null; // This will store the start time when the application begins
let epochsPassed = 0; // This will count the number of epochs since the start
const driftThreshold = 500;

function prngByTime() {
  if (!startTime) {
    startTime = new Date(); // Set the start time when the application begins
  }

  const tObject = new Date();
  const expectedTime = new Date(startTime.getTime() + epochsPassed * 1000); // Calculate expected time
  const drift = tObject - expectedTime; // Calculate the drift

  // Adjust the seeds if the drift is more than a threshold (e.g., 500ms)
  const h = drift > driftThreshold ? tObject.getUTCHours() : tObject.getHours();
  const s = drift > driftThreshold ? tObject.getUTCSeconds() : tObject.getSeconds();

  const stateZero = h + s;
  const stateOne = Math.floor(10240111 / (tObject.getMinutes() || 1)); // Avoid division by zero
  epochsPassed++; // Increment the number of epochs

  return xorshift(stateZero, stateOne);
}

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

  s1 ^= s1 << 23; // SHIFT
  s1 ^= s1 >> 17; // SHIFT
  s1 ^= s0;
  s1 ^= s0 >> 26; // SHIFT
  state1 = s1;

  return state0 + state1;
}