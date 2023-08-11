// ██ main.js █████████████████████████████████
// client-side js to deterministically randomize name/age/image output.
// internal variable synced by the second can be used by other functions to determine output.

// ██ dependencies ████████████████████████████
// prngByTime.js to deterministically get a pseudo-random integer by time.
// available fn: prngByTime(), xorshift(s0, s1)
// names.js as source of first names and last names.
// available arrays: firstName, lastName

// ██ list all html elements ██████████████████
const numberPlaceholder = document.querySelector("#numberPlaceholder");
const nameString = document.querySelector("#name");
const ageString = document.querySelector("#ageString");

// ██ seed variable ███████████████████████████
let epochMs = 1245; // epoch must be greater than 1 second.
let seed = 0; // seed variable will be updated by prng at each epoch.

// ██ update the seed every second ████████████
executeAtQuantizedEpoch(() => {
  seed = Number(prngByTime());
});

// ██ functions ███████████████████████████████

// ██ update selected element in DOM ██████████
function updateElement(target, string) {
  target.textContent = string;
}

// ██ looping quantized handler function ██████
function executeAtQuantizedEpoch(callback) {
  // Calculate the time remaining until the next epoch
  const now = new Date();
  const timeSinceEpoch = now.getTime() % epochMs;
  const timeToNextEpoch = epochMs - timeSinceEpoch;

  // Wait until the next epoch, then execute the callback
  setTimeout(() => {
    callback();
    setInterval(callback, epochMs);
  }, timeToNextEpoch);
}

// ██ non-looping quantized handler function ██
function executeOnceAtQuantizedEpoch(callback) {
  // Calculate the time remaining until the next epoch
  const now = new Date();
  const timeSinceEpoch = now.getTime() % epochMs;
  const timeToNextEpoch = epochMs - timeSinceEpoch;

  // Wait until the next epoch, then execute the callback
  setTimeout(callback, timeToNextEpoch);
}

function executeNowAndAtNextQuantizedEpoch(callback) {
  // Execute the callback immediately
  callback();

  // Calculate the time remaining until the next epoch
  const now = new Date();
  const timeSinceEpoch = now.getTime() % epochMs;
  const timeToNextEpoch = epochMs - timeSinceEpoch;

  // Wait until the next epoch, then execute the callback again
  setTimeout(callback, timeToNextEpoch);
}

// ██ main functions ██████████████████████████
function updateName() {
  // Randomly pick the name based on seed
  const selFirstName = firstName[seed % firstName.length];
  const selLastName = lastName[seed % lastName.length];
  updateElement(numberPlaceholder, seed);
  updateElement(nameString, `${selFirstName} ${selLastName}`);
}

function startUpdateLoop() {
  setInterval(updateName, epochMs);
}

executeOnceAtQuantizedEpoch(startUpdateLoop);